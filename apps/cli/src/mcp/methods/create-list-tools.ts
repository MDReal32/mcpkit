import { createRowToolDefinition, createToolRows } from "../rows";
import { META_TOOLS } from "../tools/const";
import type { Catalog } from "../types/catalog";

export const createListTools = (catalog: Catalog) => () => ({
  tools: [...META_TOOLS, ...createToolRows(catalog).map(createRowToolDefinition)],
});
