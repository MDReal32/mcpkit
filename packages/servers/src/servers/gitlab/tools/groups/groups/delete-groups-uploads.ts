import { defineTool } from "@usemcpkit/core";

export const groupsGroupsDeleteGroupsUploads = defineTool({
  name: "groups:groups:delete_groups_uploads",
  description:
    "Delete an uploaded file by ID. Deletes an uploaded file with a specified ID. You must have the Maintainer or Owner role for the group.",
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
    },
    required: ["id", "upload_id"],
  },
  request: {
    method: "DELETE",
    path: "/groups/{id}/uploads/{upload_id}",
  },
});
