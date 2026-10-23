import { defineTool } from "@usemcpkit/core";

export const cloudInlineCommentsDeleteInlineComment = defineTool({
  name: "cloud:inline_comments:delete_inline_comment",
  description:
    "[Cloud] Delete inline comment. Deletes an inline comment. This is a permanent deletion and cannot be reverted.",
  input: {
    type: "object",
    properties: {
      comment_id: {
        type: "integer",
        description: "The ID of the comment to be deleted.",
      },
    },
    required: ["comment_id"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/api/v2/inline-comments/{comment_id}",
  },
});
