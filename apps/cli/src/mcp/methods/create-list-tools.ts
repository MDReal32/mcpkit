import type { ExposedToolsLoader } from "../types/exposed-tools-loader";

export const createListTools = (loadTools: ExposedToolsLoader) => async () => ({
  tools: (await loadTools()).map(({ name, description, inputSchema, annotations }) => ({
    name,
    description,
    inputSchema,
    annotations,
  })),
});
