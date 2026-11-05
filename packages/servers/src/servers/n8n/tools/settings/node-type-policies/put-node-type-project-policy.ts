import { defineTool } from "@usemcpkit/core";

export const settingsNodeTypePoliciesPutNodeTypeProjectPolicy = defineTool({
  name: "settings:node_type_policies:put_node_type_project_policy",
  description:
    "Preview: Replace a project's node type policy. **Preview** — breaking changes may still occur without major version bump.",
  input: {
    type: "object",
    properties: {
      projectId: {
        type: "string",
        description: "The ID of the project.",
      },
      rules: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            action: {
              type: "string",
              enum: ["allow", "deny"],
            },
            selector: {
              type: "object",
            },
          },
          required: ["id", "action", "selector"],
        },
      },
      defaultAction: {
        type: "string",
        enum: ["allow", "deny"],
      },
      version: {
        type: "integer",
      },
    },
    required: ["projectId", "rules", "defaultAction", "version"],
  },
  request: {
    method: "PUT",
    path: "/node-type-policies/projects/{projectId}",
    body: ["rules", "defaultAction", "version"],
  },
});
