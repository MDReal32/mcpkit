import { defineTool } from "@usemcpkit/core";

export const projectsVariablesDeleteVariable = defineTool({
  name: "projects:variables:delete_variable",
  description: "Delete a variable. Delete a variable from your instance.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the variable.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/variables/{id}",
  },
});
