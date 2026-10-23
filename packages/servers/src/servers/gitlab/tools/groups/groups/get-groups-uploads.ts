import { defineTool } from "@usemcpkit/core";

export const groupsGroupsGetGroupsUploads = defineTool({
  name: "groups:groups:get_groups_uploads",
  description:
    "Download an uploaded file by ID. Downloads an uploaded file with a specified ID. You must have the Maintainer or Owner role for the group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      upload_id: {
        type: "integer",
        description: "ID of the upload.",
      },
      save_to: {
        type: "string",
        description: "Local path the downloaded file is saved to.",
      },
    },
    required: ["id", "upload_id", "save_to"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/uploads/{upload_id}",
    saveToArg: "save_to",
  },
});
