import { defineTool } from "@usemcpkit/core";

export const tasksTasksCreateTaskFromTemplate = defineTool({
  name: "tasks:tasks:create_task_from_template",
  description:
    "Create Task From Template. Create a new task using a task template defined in your workspace. Publicly shared templates must be added to your Workspace before you can use them with the public API.",
  input: {
    type: "object",
    properties: {
      list_id: {
        type: "number",
      },
      template_id: {
        type: "string",
      },
      name: {
        type: "string",
      },
    },
    required: ["list_id", "template_id", "name"],
  },
  request: {
    method: "POST",
    path: "/v2/list/{list_id}/taskTemplate/{template_id}",
    body: ["name"],
  },
});
