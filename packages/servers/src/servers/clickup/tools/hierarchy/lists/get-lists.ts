import { defineTool } from "@usemcpkit/core";

export const hierarchyListsGetLists = defineTool({
  name: "hierarchy:lists:get_lists",
  description: "Get Lists. View the Lists within a Folder.",
  input: {
    type: "object",
    properties: {
      folder_id: {
        type: "number",
      },
      archived: {
        type: "boolean",
      },
    },
    required: ["folder_id"],
  },
  request: {
    method: "GET",
    path: "/v2/folder/{folder_id}/list",
    query: ["archived"],
  },
});
