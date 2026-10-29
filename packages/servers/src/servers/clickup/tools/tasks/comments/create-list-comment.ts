import { defineTool } from "@usemcpkit/core";

export const tasksCommentsCreateListComment = defineTool({
  name: "tasks:comments:create_list_comment",
  description: "Create List Comment. Add a comment to a List.",
  input: {
    type: "object",
    properties: {
      list_id: {
        type: "number",
      },
      comment_text: {
        type: "string",
      },
      assignee: {
        type: "integer",
      },
      notify_all: {
        type: "boolean",
        description:
          "If `notify_all` is true, the creator of the comment will also be notified. Other assignees and watchers on the List are always notified regardless of this setting.",
      },
    },
    required: ["list_id", "comment_text", "assignee", "notify_all"],
  },
  request: {
    method: "POST",
    path: "/v2/list/{list_id}/comment",
    body: ["comment_text", "assignee", "notify_all"],
  },
});
