import { defineTool } from "@usemcpkit/core";

export const projectsVariablesUpdateVariable = defineTool({
  name: "projects:variables:update_variable",
  description: "Update a variable. Update a variable from your instance.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the variable.",
      },
      body_id: {
        type: "string",
      },
      key: {
        type: "string",
      },
      value: {
        type: "string",
      },
      type: {
        type: "string",
      },
      projectId: {
        type: "string",
      },
    },
    required: ["id", "key", "value"],
  },
  request: {
    method: "PUT",
    path: "/variables/{id}",
    body: {
      id: "body_id",
      key: "key",
      value: "value",
      type: "type",
      projectId: "projectId",
    },
  },
});
