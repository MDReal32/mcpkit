import { spawn } from "node:child_process";
import { createInterface } from "node:readline";
import type { StdioUpstream } from "@usemcpkit/core";
import type { JsonRpcMessage } from "../types/json-rpc-message";
import type { McpTransport } from "../types/mcp-transport";
import type { UpstreamOptions } from "../types/upstream-options";
import { UpstreamError } from "../upstream-error";
import { createChildEnv } from "./create-child-env";
import { PendingRequests } from "./pending-requests";

const parseLine = (line: string) => {
  try {
    const parsed: unknown = JSON.parse(line);
    return typeof parsed === "object" && parsed !== null ? (parsed as JsonRpcMessage) : undefined;
  } catch {
    return undefined;
  }
};

export const createStdioTransport = ({ command, args }: StdioUpstream, { env }: UpstreamOptions) => {
  const child = spawn(command, [...(args ?? [])], {
    env: createChildEnv(env),
    stdio: ["pipe", "pipe", "ignore"],
    shell: false,
  });
  const pending = new PendingRequests();
  let open = true;
  const closedWith = (reason: string) => {
    open = false;
    pending.rejectAll(new UpstreamError(reason));
  };
  child.on("error", (error) => closedWith(`could not start "${command}": ${error.message}`));
  child.on("exit", (code) => closedWith(`"${command}" exited with code ${code ?? "unknown"}`));
  createInterface({ input: child.stdout }).on("line", (line) => {
    const message = parseLine(line);
    if (message) {
      pending.settle(message);
    }
  });
  const send = (message: Readonly<Record<string, unknown>>) =>
    new Promise<void>((resolve, reject) => {
      child.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", ...message })}\n`, (error) =>
        error ? reject(new UpstreamError(error.message)) : resolve(),
      );
    });
  const transport: McpTransport = {
    request: async (method, params) => {
      const { id, reply } = pending.open();
      try {
        await send({ id, method, params });
      } catch (error) {
        pending.forget(id);
        throw error;
      }
      return reply;
    },
    notify: (method, params) => send({ method, params }),
    isOpen: () => open,
    close: async () => {
      child.stdin.end();
      child.kill();
    },
  };
  return transport;
};
