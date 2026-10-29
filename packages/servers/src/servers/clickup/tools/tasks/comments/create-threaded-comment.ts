import { defineTool } from "@usemcpkit/core";

export const tasksCommentsCreateThreadedComment = defineTool({
  name: "tasks:comments:create_threaded_comment",
  description: "Create Threaded Comment. Create a threaded comment.",
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
        type: "string",
      },
      notify_all: {
        type: "boolean",
        description:
          "If `notify_all` is true, the creator of the comment will also be notified. Other assignees and watchers on the task are always notified regardless of this setting.",
      },
    },
    required: ["comment_id", "comment_text", "notify_all"],
  },
  request: {
    method: "POST",
    path: "/v2/comment/{comment_id}/reply",
    body: ["comment_text", "assignee", "group_assignee", "notify_all"],
  },
});
