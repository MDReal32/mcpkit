import { defineTool } from "@usemcpkit/core";

export const tasksTaskChecklistsEditChecklistItem = defineTool({
  name: "tasks:task_checklists:edit_checklist_item",
  description:
    "Edit Checklist Item. Update an individual line item in a task checklist. \\ \\ You can rename it, set the assignee, mark it as resolved, or nest it under another checklist item.",
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
      name: {
        type: "string",
      },
      assignee: {
        type: "string",
      },
      resolved: {
        type: "boolean",
      },
      parent: {
        type: "string",
        description:
          "To nest a checklist item under another checklist item, include the other item's `checklist_item_id`.",
      },
    },
    required: ["checklist_id", "checklist_item_id"],
  },
  request: {
    method: "PUT",
    path: "/v2/checklist/{checklist_id}/checklist_item/{checklist_item_id}",
    body: ["name", "assignee", "resolved", "parent"],
  },
});
