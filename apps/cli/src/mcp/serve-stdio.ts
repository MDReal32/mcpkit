import { createInterface } from "node:readline";
import { createRpcHandler } from "./rpc/create-rpc-handler";
import { handleLine } from "./rpc/handle-line";
import { TOOLS_LIST_CHANGED } from "./supervisor/const";
import type { Catalog } from "./types/catalog";
import type { McpOptions } from "./types/mcp-options";
import type { StdioOptions } from "./types/stdio-options";

/**
 * Serves newline-delimited JSON-RPC until input closes; stdout carries protocol messages only. The `tools/list_changed`
 * notification is written after the response of the call that opened a section, so the client lists again afterwards.
 */
export const serveStdio = (
  catalog: Catalog,
  { input = process.stdin, output = process.stdout }: StdioOptions = {},
  options: McpOptions = {},
) => {
  const announceToolsChanged = () => {
    options.onToolsChanged?.();
    setImmediate(() => output.write(`${JSON.stringify(TOOLS_LIST_CHANGED)}\n`));
  };
  const handler = createRpcHandler(catalog, { ...options, onToolsChanged: announceToolsChanged });
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
