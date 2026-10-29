import { defineTool } from "@usemcpkit/core";

export const tasksTaskChecklistsDeleteChecklist = defineTool({
  name: "tasks:task_checklists:delete_checklist",
  description: "Delete Checklist. Delete a checklist from a task.",
  input: {
    type: "object",
    properties: {
      checklist_id: {
        type: "string",
        description: "b8a8-48d8-a0c6-b4200788a683 (uuid)",
      },
    },
    required: ["checklist_id"],
  },
  request: {
    method: "DELETE",
    path: "/v2/checklist/{checklist_id}",
  },
});
