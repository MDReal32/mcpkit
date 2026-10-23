import { defineTool } from "@usemcpkit/core";

export const issuesToDosCreateTodosMarkAsDone = defineTool({
  name: "issues:to_dos:create_todos_mark_as_done",
  description: "Mark a to-do item as done. Marks a to-do item for the current user as done.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the to-do item.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "POST",
    path: "/todos/{id}/mark_as_done",
  },
});
