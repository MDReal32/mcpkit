import { defineTool } from "@usemcpkit/core";

export const tasksTasksUpdateTaskTimeEstimatesByUser = defineTool({
  name: "tasks:tasks:update_task_time_estimates_by_user",
  description: "Update task time estimates by user. Replace the time estimates on a task for specified assignees.",
  input: {
    type: "object",
    properties: {
      workspace_id: {
        type: "string",
        description: "The ID of the Workspace.",
      },
      task_id: {
        type: "string",
        description: "The ID of the task. This parameter supports task IDs and Custom task IDs.",
      },
      body: {
        type: "array",
        items: {
          type: "object",
          properties: {
            assignee: {
              description:
                "The user ID of the assignee, or `unassigned` for time estimates that are not assigned to anyone.",
            },
            time: {
              type: "integer",
              description: "The time estimate in milliseconds. Must be a non-negative integer.",
            },
          },
          required: ["assignee", "time"],
        },
      },
    },
    required: ["workspace_id", "task_id", "body"],
  },
  request: {
    method: "PATCH",
    path: "/v3/workspaces/{workspace_id}/tasks/{task_id}/time_estimates_by_user",
    bodyArg: "body",
  },
});
