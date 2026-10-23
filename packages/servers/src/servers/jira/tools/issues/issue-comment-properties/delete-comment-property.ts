import { defineTool } from "@usemcpkit/core";

export const issuesIssueCommentPropertiesDeleteCommentProperty = defineTool({
  name: "issues:issue_comment_properties:delete_comment_property",
  description: "Delete comment property. Deletes a comment property.",
  input: {
    type: "object",
    properties: {
      commentId: {
        type: "string",
        description: "The ID of the comment.",
      },
      propertyKey: {
        type: "string",
        description: "The key of the property.",
      },
    },
    required: ["commentId", "propertyKey"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/comment/{commentId}/properties/{propertyKey}",
  },
});
