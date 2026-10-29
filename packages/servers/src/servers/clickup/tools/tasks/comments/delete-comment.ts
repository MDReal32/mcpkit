import { defineTool } from "@usemcpkit/core";

export const tasksCommentsDeleteComment = defineTool({
  name: "tasks:comments:delete_comment",
  description: "Delete Comment. Delete a task comment.",
  input: {
    type: "object",
    properties: {
      comment_id: {
        type: "number",
      },
    },
    required: ["comment_id"],
  },
  request: {
    method: "DELETE",
    path: "/v2/comment/{comment_id}",
  },
});
