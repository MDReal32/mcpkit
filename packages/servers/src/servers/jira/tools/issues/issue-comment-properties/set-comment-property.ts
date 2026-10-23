import { defineTool } from "@usemcpkit/core";

export const issuesIssueCommentPropertiesSetCommentProperty = defineTool({
  name: "issues:issue_comment_properties:set_comment_property",
  description:
    "Set comment property. Creates or updates the value of a property for a comment. Use this resource to store custom data against a comment.",
  input: {
    type: "object",
    properties: {
      commentId: {
        type: "string",
        description: "The ID of the comment.",
      },
      propertyKey: {
        type: "string",
        description: "The key of the property. The maximum length is 255 characters.",
      },
      body: {},
    },
    required: ["commentId", "propertyKey", "body"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/comment/{commentId}/properties/{propertyKey}",
    bodyArg: "body",
  },
});
