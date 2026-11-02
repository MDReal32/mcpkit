import { createInterface } from "node:readline";
import { createRpcHandler } from "./rpc/create-rpc-handler";
import { handleLine } from "./rpc/handle-line";
import { TOOLS_LIST_CHANGED } from "./supervisor/const";
import type { Catalog } from "./types/catalog";
import type { McpOptions } from "./types/mcp-options";
import type { StdioOptions } from "./types/stdio-options";
import { describeWireLine } from "./wire-log";

/**
 * Serves newline-delimited JSON-RPC until input closes; stdout carries protocol messages only. The `tools/list_changed`
 * notification is written after the response of the call that opened a section, so the client lists again afterwards.
 * Once input closed, the requests in flight are answered and the catalog is closed, so nothing keeps the process alive.
 */
export const serveStdio = async (
  catalog: Catalog,
  { input = process.stdin, output = process.stdout }: StdioOptions = {},
  options: McpOptions = {},
) => {
  const wireLog = options.wireLog;
  const writeLine = (line: string, event: string) => {
    wireLog?.(event, describeWireLine(line));
    output.write(`${line}\n`, (error) => {
      if (error) {
        wireLog?.("write-error", { event, message: error.message });
      }
    });
  };
  const announceToolsChanged = () => {
    options.onToolsChanged?.();
    setImmediate(() => writeLine(JSON.stringify(TOOLS_LIST_CHANGED), "notice-out"));
  };
  const handler = createRpcHandler(catalog, { ...options, onToolsChanged: announceToolsChanged });
  const inFlight = new Set<Promise<void>>();
  const lines = createInterface({ input, crlfDelay: Infinity });
  lines.on("line", (line) => {
    wireLog?.("line-in", describeWireLine(line));
    const answered = handleLine(line, handler).then((response) => {
      if (response) {
        writeLine(JSON.stringify(response), "response-out");
      }
    });
    inFlight.add(answered);
    void answered.finally(() => inFlight.delete(answered));
  });
  await new Promise<void>((resolve) => {
    lines.once("close", resolve);
  });
  wireLog?.("input-closed", { inFlight: inFlight.size });
  await Promise.allSettled(inFlight);
  await catalog.close?.();
};
