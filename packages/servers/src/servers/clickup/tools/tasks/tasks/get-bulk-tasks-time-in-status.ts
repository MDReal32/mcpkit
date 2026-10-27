import { defineTool } from "@usemcpkit/core";

export const tasksTasksGetBulkTasksTimeInStatus = defineTool({
  name: "tasks:tasks:get_bulk_tasks_time_in_status",
  description:
    "Get Bulk Tasks' Time in Status. View how long two or more tasks have been in each status. The Total time in Status ClickApp must first be enabled by the Workspace owner or an admin.",
  input: {
    type: "object",
    properties: {
      task_ids: {
        type: "string",
        description:
          "Include this paramater once per `task_id`. You can include up to 100 task ids per request. For example: `task_ids=3cuh&task_ids=g4fs`",
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
    required: ["task_ids"],
  },
  request: {
    method: "GET",
    path: "/v2/task/bulk_time_in_status/task_ids",
    query: ["task_ids", "custom_task_ids", "team_id"],
  },
});
