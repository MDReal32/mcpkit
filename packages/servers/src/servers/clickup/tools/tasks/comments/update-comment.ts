import { defineTool } from "@usemcpkit/core";

export const tasksCommentsUpdateComment = defineTool({
  name: "tasks:comments:update_comment",
  description:
    "Update Comment. Replace the content of a task commment, assign a comment, and mark a comment as resolved.",
  input: {
    type: "object",
    properties: {
      comment_id: {
        type: "number",
      },
      comment_text: {
        type: "string",
      },
      assignee: {
        type: "integer",
      },
      group_assignee: {
        type: "integer",
      },
      resolved: {
        type: "boolean",
      },
    },
    required: ["comment_id", "comment_text", "assignee", "resolved"],
  },
  request: {
    method: "PUT",
    path: "/v2/comment/{comment_id}",
    body: ["comment_text", "assignee", "group_assignee", "resolved"],
  },
});
