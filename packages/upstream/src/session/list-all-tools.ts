import type { McpTransport } from "../types/mcp-transport";
import type { UpstreamTool } from "../types/upstream-tool";
import { readToolPage } from "./read-tool-page";

export const listAllTools = async (transport: McpTransport) => {
  const tools: UpstreamTool[] = [];
  let cursor: string | undefined;
  do {
    const page = readToolPage(await transport.request("tools/list", cursor ? { cursor } : {}));
    tools.push(...page.tools);
    cursor = page.nextCursor;
  } while (cursor);
  return tools;
};
