import { spawn } from "node:child_process";
import { isCompiledBinary } from "@usemcpkit/binary";
import { describeError } from "@usemcpkit/core";
import { printError } from "../output/print-error";
import { openBrowser } from "./open-browser";

/**
 * The compiled binary shows the form in its own native window (`mcpkit window <url>`, a process of its own because the
 * webview blocks its thread). When that window cannot open, or outside the binary (`npx` on Node), it says so and opens
 * the default browser instead.
 */
export const openFormWindow = (url: string) => {
  if (!isCompiledBinary()) {
    openBrowser(url);
    return;
  }
  const child = spawn(process.execPath, ["window", url], { stdio: ["ignore", "ignore", "pipe"], detached: true });
  let stderr = "";
  child.stderr.on("data", (chunk: Buffer) => {
    stderr += chunk.toString();
  });
  const fallBack = (reason: string) => {
    printError(`could not open the credentials window (${reason}), opening the default browser`);
    openBrowser(url);
  };
  child.on("error", (error) => fallBack(describeError(error)));
  child.on("exit", (code) => {
    if (code !== 0) {
      fallBack(stderr.trim() || `exit ${code}`);
    }
  });
  child.unref();
};
