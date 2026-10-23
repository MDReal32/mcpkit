import { defineTool } from "@usemcpkit/core";

export const groupsGroupsCreateGroupsPlaceholderReassignments = defineTool({
  name: "groups:groups:create_groups_placeholder_reassignments",
  description: "Reassign placeholders. Reassigns placeholder users with an uploaded CSV file.",
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
    path: "/groups/{id}/placeholder_reassignments",
    body: ["file"],
    contentType: "multipart/form-data",
    fileArgs: ["file"],
  },
});
