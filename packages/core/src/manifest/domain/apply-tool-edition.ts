import type { ToolSpec } from "../types/tool/tool-spec";

export const applyToolEdition = (tool: ToolSpec, editionName: string | undefined) => {
  const edition = editionName === undefined ? undefined : tool.editions?.[editionName];
  if (!edition) {
    return tool;
  }
  const resolved: ToolSpec = { ...tool, request: edition.request, response: edition.response ?? tool.response };
  return resolved;
};
