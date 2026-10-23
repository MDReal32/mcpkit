import { defineTool } from "@usemcpkit/core";

export const cloudInlineCommentsGetInlineCommentOperations = defineTool({
  name: "cloud:inline_comments:get_inline_comment_operations",
  description:
    "[Cloud] Get permitted operations for inline comment. Returns the permitted operations on specific inline comment.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the inline comment for which operations should be returned.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/inline-comments/{id}/operations",
  },
});
