import { defineTool } from "@usemcpkit/core";

export const filesCommentsDeleteComment = defineTool({
  name: "files:comments:delete_comment",
  description:
    "Delete a comment. Deletes a specific comment. Only the person who made the comment is allowed to delete it.",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description:
          "File to delete comment from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.",
      },
      comment_id: {
        type: "string",
        description: "Comment id of comment to delete",
      },
    },
    required: ["file_key", "comment_id"],
  },
  request: {
    method: "DELETE",
    path: "/v1/files/{file_key}/comments/{comment_id}",
  },
});
