import { defineTool } from "@usemcpkit/core";

export const issuesTasksCancelTask = defineTool({
  name: "issues:tasks:cancel_task",
  description: "Cancel task. Cancels a task.",
  input: {
    type: "object",
    properties: {
      taskId: {
        type: "string",
        description: "The ID of the task.",
      },
    },
    required: ["taskId"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/task/{taskId}/cancel",
  },
});
