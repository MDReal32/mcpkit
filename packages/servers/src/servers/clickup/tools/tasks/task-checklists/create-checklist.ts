import { defineTool } from "@usemcpkit/core";

export const tasksTaskChecklistsCreateChecklist = defineTool({
  name: "tasks:task_checklists:create_checklist",
  description: "Create Checklist. Add a new checklist to a task.",
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
      name: {
        type: "string",
      },
    },
    required: ["task_id", "name"],
  },
  request: {
    method: "POST",
    path: "/v2/task/{task_id}/checklist",
    query: ["custom_task_ids", "team_id"],
    body: ["name"],
  },
});
