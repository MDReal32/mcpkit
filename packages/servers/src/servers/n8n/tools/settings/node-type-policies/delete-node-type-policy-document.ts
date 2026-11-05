import { defineTool } from "@usemcpkit/core";

export const settingsNodeTypePoliciesDeleteNodeTypePolicyDocument = defineTool({
  name: "settings:node_type_policies:delete_node_type_policy_document",
  description:
    "Preview: Delete a node type policy document. **Preview** — breaking changes may still occur without major version bump.",
  input: {
    type: "object",
    properties: {
      policyId: {
        type: "string",
        description: "The ID of the node type policy document.",
      },
    },
    required: ["policyId"],
  },
  request: {
    method: "DELETE",
    path: "/node-type-policies/policies/{policyId}",
  },
});
