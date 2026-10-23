import { defineTool } from "@usemcpkit/core";

export const workflowsIssueTypesCreateIssueTypeAvatar = defineTool({
  name: "workflows:issue_types:create_issue_type_avatar",
  description: "Load issue type avatar. Loads an avatar for the issue type.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the issue type.",
      },
      x: {
        type: "integer",
        default: 0,
        description: "The X coordinate of the top-left corner of the crop region.",
      },
      y: {
        type: "integer",
        default: 0,
        description: "The Y coordinate of the top-left corner of the crop region.",
      },
      size: {
        type: "integer",
        description: "The length of each side of the crop region.",
      },
      body: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["id", "size", "body"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/issuetype/{id}/avatar2",
    query: ["x", "y", "size"],
    bodyArg: "body",
    contentType: "application/octet-stream",
    fileArgs: ["body"],
  },
});
