import type { Catalog } from "../types/catalog";
import type { McpOptions } from "../types/mcp-options";
import { listExposedTools } from "./list-exposed-tools";

export const findExposedTool = async (catalog: Catalog, options: McpOptions, name: unknown) => {
  const patterns = (await options.exposedTools?.()) ?? [];
  return listExposedTools(catalog, patterns).tools.find((tool) => tool.name === name);
};
