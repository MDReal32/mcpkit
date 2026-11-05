import { defineTool } from "@usemcpkit/core";

export const projectsVariablesCreateVariable = defineTool({
  name: "projects:variables:create_variable",
  description: "Create a variable. Create a variable in your instance.",
  input: {
    type: "object",
    properties: {
      id: {
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
    required: ["key", "value"],
  },
  request: {
    method: "POST",
    path: "/variables",
    body: ["id", "key", "value", "type", "projectId"],
  },
});
