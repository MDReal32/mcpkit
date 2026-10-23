import { defineTool } from "@usemcpkit/core";

export const groupsGroupsGetGroupsUploadsGet = defineTool({
  name: "groups:groups:get_groups_uploads_get",
  description:
    "Download an uploaded file by secret and filename. Downloads an uploaded file with a specified secret and filename. You must have the Guest, Planner, Reporter, Developer, Maintainer, or Owner role for the group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      secret: {
        type: "string",
        description: "Secret of the upload.",
      },
      filename: {
        type: "string",
        description: "Filename of the upload.",
      },
    },
    required: ["id", "secret", "filename"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/uploads/{secret}/{filename}",
  },
});
