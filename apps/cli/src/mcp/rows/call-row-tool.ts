import type { ToolArgs } from "@usemcpkit/core";
import { callServerTool } from "../handlers/call-server-tool";
import { TOOL_ID_SEPARATOR } from "../tools/const";
import { createTextResult } from "../tools/create-text-result";
import { createToolId } from "../tools/create-tool-id";
import type { Catalog } from "../types/catalog";
import type { McpOptions } from "../types/mcp-options";
import type { ToolRow } from "./tool-row";

export const callRowTool = (
  catalog: Catalog,
  row: ToolRow,
  operation: string,
  args: ToolArgs | undefined,
  options: McpOptions,
) => {
  if (!row.operations.includes(operation)) {
    return createTextResult(`${row.name} does not cover "${operation}"; see list_tools for ${row.serverId}`, true);
  }
  const tool = [...row.group, operation].join(TOOL_ID_SEPARATOR);
  return callServerTool(catalog, createToolId(row.serverId, tool), args, options);
};
