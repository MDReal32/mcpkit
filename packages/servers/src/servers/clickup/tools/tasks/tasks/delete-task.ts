import { defineTool } from "@usemcpkit/core";

export const tasksTasksDeleteTask = defineTool({
  name: "tasks:tasks:delete_task",
  description: "Delete Task. Delete a task from your Workspace.",
  input: {
    type: "object",
    properties: {
      task_id: {
        type: "string",
      },
      custom_task_ids: {
        type: "boolean",
        description: "If you want to reference a task by its custom task id, this value must be `true`.",
      },
      team_id: {
        type: "number",
        description:
          "When the `custom_task_ids` parameter is set to `true`, the Workspace ID must be provided using the `team_id` parameter. \\ For example: `custom_task_ids=true&team_id=123`.",
      },
    },
    required: ["task_id"],
  },
  request: {
    method: "DELETE",
    path: "/v2/task/{task_id}",
    query: ["custom_task_ids", "team_id"],
  },
});
