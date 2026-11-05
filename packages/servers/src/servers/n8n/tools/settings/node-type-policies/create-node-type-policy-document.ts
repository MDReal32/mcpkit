import { defineTool } from "@usemcpkit/core";

export const settingsNodeTypePoliciesCreateNodeTypePolicyDocument = defineTool({
  name: "settings:node_type_policies:create_node_type_policy_document",
  description:
    "Preview: Create a node type policy document. **Preview** — breaking changes may still occur without major version bump.",
  input: {
    type: "object",
    properties: {
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
              enum: ["allow", "deny", "delegate"],
            },
            selector: {
              type: "object",
            },
          },
          required: ["id", "action", "selector"],
        },
      },
    },
    required: ["rules"],
  },
  request: {
    method: "POST",
    path: "/node-type-policies/policies",
    body: ["rules"],
  },
});
