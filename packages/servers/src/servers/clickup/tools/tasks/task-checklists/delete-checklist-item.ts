import { defineTool } from "@usemcpkit/core";

export const tasksTaskChecklistsDeleteChecklistItem = defineTool({
  name: "tasks:task_checklists:delete_checklist_item",
  description: "Delete Checklist Item. Delete a line item from a task checklist.",
  input: {
    type: "object",
    properties: {
      checklist_id: {
        type: "string",
        description: "b8a8-48d8-a0c6-b4200788a683 (uuid)",
      },
      checklist_item_id: {
        type: "string",
        description: "e491-47f5-9fd8-d1dc4cedcc6f (uuid)",
      },
    },
    required: ["checklist_id", "checklist_item_id"],
  },
  request: {
    method: "DELETE",
    path: "/v2/checklist/{checklist_id}/checklist_item/{checklist_item_id}",
  },
});
