import { describeExposedTools } from "../expose";
import { META_TOOLS } from "../tools/const";
import type { Catalog } from "../types/catalog";
import type { McpOptions } from "../types/mcp-options";

export const createListTools = (catalog: Catalog, options: McpOptions) => async () => ({
  tools: [...META_TOOLS, ...(await describeExposedTools(catalog, options))],
});
