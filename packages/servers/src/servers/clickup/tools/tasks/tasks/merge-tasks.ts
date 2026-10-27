import { defineTool } from "@usemcpkit/core";

export const tasksTasksMergeTasks = defineTool({
  name: "tasks:tasks:merge_tasks",
  description:
    "Merge Tasks. Merge multiple tasks into a target task. The target task is specified by the task_id parameter, while the source tasks to be merged are provided in the request body. Custom Task IDs are not supported.",
  input: {
    type: "object",
    properties: {
      task_id: {
        type: "string",
        description: "ID of the target task that other tasks will be merged into.",
      },
      source_task_ids: {
        type: "array",
        description: "Array of task IDs to merge into the target task.",
        items: {
          type: "string",
        },
      },
    },
    required: ["task_id", "source_task_ids"],
  },
  request: {
    method: "POST",
    path: "/v2/task/{task_id}/merge",
    body: ["source_task_ids"],
  },
});
