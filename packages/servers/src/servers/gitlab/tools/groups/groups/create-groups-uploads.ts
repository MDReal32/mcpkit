import { defineTool } from "@usemcpkit/core";

export const groupsGroupsCreateGroupsUploads = defineTool({
  name: "groups:groups:create_groups_uploads",
  description:
    "Upload a file to a group. Uploads a file to the specified group. Returns a markdown-formatted link to the file.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      file: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["id", "file"],
  },
  request: {
    method: "POST",
    path: "/groups/{id}/uploads",
    body: ["file"],
    contentType: "multipart/form-data",
    fileArgs: ["file"],
  },
});
