import { defineTool } from "@usemcpkit/core";

export const issuesIssueCommentPropertiesGetCommentPropertyKeys = defineTool({
  name: "issues:issue_comment_properties:get_comment_property_keys",
  description: "Get comment property keys. Returns the keys of all the properties of a comment.",
  input: {
    type: "object",
    properties: {
      commentId: {
        type: "string",
        description: "The ID of the comment.",
      },
    },
    required: ["commentId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/comment/{commentId}/properties",
  },
});
