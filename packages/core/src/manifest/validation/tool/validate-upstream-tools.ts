export const validateUpstreamTools = (tools: unknown) =>
  Array.isArray(tools) && tools.length === 0 ? [] : ["tools must be empty when the manifest has an upstream"];
