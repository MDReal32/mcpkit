import { defineTool } from "@usemcpkit/core";

export const settingsNodeTypePoliciesUpdateNodeTypePolicyDocument = defineTool({
  name: "settings:node_type_policies:update_node_type_policy_document",
  description:
    "Preview: Replace the rules of a node type policy document. **Preview** — breaking changes may still occur without major version bump.",
  input: {
    type: "object",
    properties: {
      policyId: {
        type: "string",
        description: "The ID of the node type policy document.",
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
              enum: ["allow", "deny", "delegate"],
            },
            selector: {
              type: "object",
            },
          },
          required: ["id", "action", "selector"],
        },
      },
      version: {
        type: "integer",
      },
    },
    required: ["policyId", "rules", "version"],
  },
  request: {
    method: "PUT",
    path: "/node-type-policies/policies/{policyId}",
    body: ["rules", "version"],
  },
});
