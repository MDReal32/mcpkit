import { defineTool } from "@usemcpkit/core";

export const cloudFoldersGetFolderOperations = defineTool({
  name: "cloud:folders:get_folder_operations",
  description: "[Cloud] Get permitted operations for a folder. Returns the permitted operations on specific folder.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the folder for which operations should be returned.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/folders/{id}/operations",
  },
});
