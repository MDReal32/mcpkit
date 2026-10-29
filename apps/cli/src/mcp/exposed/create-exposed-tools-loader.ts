import type { Catalog } from "../types/catalog";
import type { McpOptions } from "../types/mcp-options";
import { createExposedTools } from "./create-exposed-tools";
import type { ExposedTool } from "./exposed-tool";

/** The exposed tools are built on first use and then kept, so manifests are read once per serve. */
export const createExposedToolsLoader = (catalog: Catalog, options: McpOptions) => {
  let loading: Promise<ExposedTool[]> | undefined;
  return () => {
    loading ??= createExposedTools(catalog, options);
    return loading;
  };
};
