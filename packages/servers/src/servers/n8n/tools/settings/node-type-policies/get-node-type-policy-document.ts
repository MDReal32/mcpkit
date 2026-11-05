import { defineTool } from "@usemcpkit/core";

export const settingsNodeTypePoliciesGetNodeTypePolicyDocument = defineTool({
  name: "settings:node_type_policies:get_node_type_policy_document",
  description:
    "Preview: Retrieve a node type policy document. **Preview** — breaking changes may still occur without major version bump.",
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
    method: "GET",
    path: "/node-type-policies/policies/{policyId}",
  },
});
