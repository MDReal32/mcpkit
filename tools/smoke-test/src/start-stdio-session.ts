import { spawn } from "node:child_process";
import { once } from "node:events";
import { createInterface } from "node:readline";
import type { JsonRpcMessage } from "./types/json-rpc-message.ts";
import type { SessionOptions } from "./types/session-options.ts";
import type { StdioSession } from "./types/stdio-session.ts";

/** Starts `command` as an MCP client would: one JSON-RPC message per line on its stdin and stdout. */
export const startStdioSession = (options: SessionOptions) => {
  const child = spawn(options.command, options.args, {
    env: options.env,
    stdio: ["pipe", "pipe", "pipe"],
  });
  const lines: string[] = [];
  const waiters: ((line: string | undefined) => void)[] = [];
  let ended = false;
  let stderr = "";

  child.stderr.setEncoding("utf8");
  child.stderr.on("data", (chunk: string) => {
    stderr += chunk;
  });
  const reader = createInterface({ input: child.stdout });
  reader.on("line", (line) => {
    const waiter = waiters.shift();
    if (waiter === undefined) {
      lines.push(line);
      return;
    }
    waiter(line);
  });
  reader.on("close", () => {
    ended = true;
    for (const waiter of waiters.splice(0)) {
      waiter(undefined);
    }
  });
  const exited = once(child, "exit").then(([code]) => code);

  const nextLine = () => {
    const line = lines.shift();
    if (line !== undefined || ended) {
      return Promise.resolve(line);
    }
    return new Promise<string | undefined>((resolve) => {
      waiters.push(resolve);
    });
  };

  const withTimeout = async <Value>(promise: Promise<Value>, what: string) => {
    let timer: NodeJS.Timeout | undefined;
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error(`no ${what} within ${options.timeoutMs} ms`)), options.timeoutMs);
    });
    try {
      return await Promise.race([promise, timeout]);
    } finally {
      clearTimeout(timer);
    }
  };

  const session: StdioSession = {
    send: (message) => {
      child.stdin.write(`${JSON.stringify(message)}\n`);
    },
    receive: async <Result>() => {
      const line = await withTimeout(nextLine(), "line from usemcpkit");
      if (line === undefined) {
        throw new Error("usemcpkit closed its output");
      }
      const message: JsonRpcMessage<Result> = JSON.parse(line);
      return message;
    },
    close: async () => {
      child.stdin.end();
      return withTimeout(exited, "exit after closing stdin");
    },
    kill: async () => {
      child.kill();
      return exited;
    },
    stderr: () => stderr,
  };
  return session;
};
