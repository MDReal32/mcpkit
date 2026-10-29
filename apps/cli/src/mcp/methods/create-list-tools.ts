import type { ToolExposure } from "../exposed";

export const createListTools = (exposure: ToolExposure) => () => ({
  tools: exposure.list().map(({ name, description, inputSchema, annotations }) => ({
    name,
    description,
    inputSchema,
    annotations,
  })),
});
