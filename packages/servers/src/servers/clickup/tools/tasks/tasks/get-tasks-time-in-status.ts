import { defineTool } from "@usemcpkit/core";

export const tasksTasksGetTasksTimeInStatus = defineTool({
  name: "tasks:tasks:get_tasks_time_in_status",
  description:
    "Get Task's Time in Status. View how long a task has been in each status. The Total time in Status ClickApp must first be enabled by the Workspace owner or an admin.",
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
    },
    required: ["task_id"],
  },
  request: {
    method: "GET",
    path: "/v2/task/{task_id}/time_in_status",
    query: ["custom_task_ids", "team_id"],
  },
});
