import { defineTool } from "@usemcpkit/core";

export const tasksCommentsCreateTaskComment = defineTool({
  name: "tasks:comments:create_task_comment",
  description: "Create Task Comment. Add a new comment to a task.",
  input: {
    type: "object",
    properties: {
      task_id: {
        type: "string",
      },
      custom_task_ids: {
        type: "boolean",
        description: "If you want to reference a task by it's custom task id, this value must be `true`.",
      },
      team_id: {
        type: "number",
        description:
          "When the `custom_task_ids` parameter is set to `true`, the Workspace ID must be provided using the `team_id` parameter. \\ For example: `custom_task_ids=true&team_id=123`.",
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
    required: ["task_id", "comment_text", "notify_all"],
  },
  request: {
    method: "POST",
    path: "/v2/task/{task_id}/comment",
    query: ["custom_task_ids", "team_id"],
    body: ["comment_text", "assignee", "group_assignee", "notify_all"],
  },
});
