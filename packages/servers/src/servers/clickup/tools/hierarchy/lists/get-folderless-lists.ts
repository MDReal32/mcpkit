import { defineTool } from "@usemcpkit/core";

export const hierarchyListsGetFolderlessLists = defineTool({
  name: "hierarchy:lists:get_folderless_lists",
  description: "Get Folderless Lists. View the Lists in a Space that aren't located in a Folder.",
  input: {
    type: "object",
    properties: {
      space_id: {
        type: "number",
      },
      archived: {
        type: "boolean",
      },
    },
    required: ["space_id"],
  },
  request: {
    method: "GET",
    path: "/v2/space/{space_id}/list",
    query: ["archived"],
  },
});
