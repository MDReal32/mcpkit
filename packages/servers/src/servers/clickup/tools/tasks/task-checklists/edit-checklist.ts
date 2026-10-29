import { defineTool } from "@usemcpkit/core";

export const tasksTaskChecklistsEditChecklist = defineTool({
  name: "tasks:task_checklists:edit_checklist",
  description:
    "Edit Checklist. Rename a task checklist, or reorder a checklist so it appears above or below other checklists on a task.",
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
      position: {
        type: "integer",
        description:
          'Position refers to the order of appearance of checklists on a task.\\ \\ To set a checklist to appear at the top of the checklists section of a task, use `"position": 0`.',
      },
    },
    required: ["checklist_id"],
  },
  request: {
    method: "PUT",
    path: "/v2/checklist/{checklist_id}",
    body: ["name", "position"],
  },
});
