import { defineTool } from "@usemcpkit/core";

export const tasksCommentsCreateChatViewComment = defineTool({
  name: "tasks:comments:create_chat_view_comment",
  description: "Create Chat View Comment. Add a new comment to a Chat view.",
  input: {
    type: "object",
    properties: {
      view_id: {
        type: "string",
        description: "105 (string)",
      },
      comment_text: {
        type: "string",
      },
      notify_all: {
        type: "boolean",
        description:
          "If `notify_all` is true, the creator of the comment will also be notified. Other assignees and watchers on the view are always notified regardless of this setting.",
      },
    },
    required: ["view_id", "comment_text", "notify_all"],
  },
  request: {
    method: "POST",
    path: "/v2/view/{view_id}/comment",
    body: ["comment_text", "notify_all"],
  },
});
