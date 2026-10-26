import { createInterface } from "node:readline";
import { createRpcHandler } from "./rpc/create-rpc-handler";
import { handleLine } from "./rpc/handle-line";
import type { Catalog } from "./types/catalog";
import type { McpOptions } from "./types/mcp-options";
import type { StdioOptions } from "./types/stdio-options";

/** Serves newline-delimited JSON-RPC until input closes; stdout carries protocol messages only. */
export const serveStdio = (
  catalog: Catalog,
  { input = process.stdin, output = process.stdout }: StdioOptions = {},
  options: McpOptions = {},
) => {
  const handler = createRpcHandler(catalog, options);
  const lines = createInterface({ input, crlfDelay: Infinity });
  lines.on("line", (line) => {
    void handleLine(line, handler).then((response) => {
      if (response) {
        output.write(`${JSON.stringify(response)}\n`);
      }
    });
  });
  return new Promise<void>((resolve) => {
    lines.once("close", resolve);
  });
};
