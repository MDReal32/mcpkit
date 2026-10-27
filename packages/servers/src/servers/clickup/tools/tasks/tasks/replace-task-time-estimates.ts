import { defineTool } from "@usemcpkit/core";

export const tasksTasksReplaceTaskTimeEstimates = defineTool({
  name: "tasks:tasks:replace_task_time_estimates",
  description:
    "Replace task time estimates. Replaces all time estimates for a task with the provided time estimates. Any existing time estimates not included in the request will be removed.",
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
    method: "PUT",
    path: "/v3/workspaces/{workspace_id}/tasks/{task_id}/time_estimates_by_user",
    bodyArg: "body",
  },
});
