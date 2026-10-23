import { defineTool } from "@usemcpkit/core";

export const cloudFoldersGetFolderRestrictionState = defineTool({
  name: "cloud:folders:get_folder_restriction_state",
  description: "[Cloud] Get folder restriction state. Returns the restriction state of a folder.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the folder.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/folders/{id}/restriction-state",
  },
});
