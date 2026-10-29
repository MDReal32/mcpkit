import { defineTool } from "@usemcpkit/core";

export const tasksTaskChecklistsCreateChecklistItem = defineTool({
  name: "tasks:task_checklists:create_checklist_item",
  description: "Create Checklist Item. Add a line item to a task checklist.",
  input: {
    type: "object",
    properties: {
      checklist_id: {
        type: "string",
        description: "b8a8-48d8-a0c6-b4200788a683 (uuid)",
      },
      name: {
        type: "string",
      },
      assignee: {
        type: "integer",
      },
    },
    required: ["checklist_id"],
  },
  request: {
    method: "POST",
    path: "/v2/checklist/{checklist_id}/checklist_item",
    body: ["name", "assignee"],
  },
});
