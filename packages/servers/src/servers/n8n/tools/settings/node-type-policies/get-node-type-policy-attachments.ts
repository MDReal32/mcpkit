import { defineTool } from "@usemcpkit/core";

export const settingsNodeTypePoliciesGetNodeTypePolicyAttachments = defineTool({
  name: "settings:node_type_policies:get_node_type_policy_attachments",
  description:
    "Preview: Retrieve a scope's attached policy documents. **Preview** — breaking changes may still occur without major version bump.",
  input: {
    type: "object",
    properties: {
      scopeId: {
        type: "string",
        description: "The ID of the node type policy scope.",
      },
    },
    required: ["scopeId"],
  },
  request: {
    method: "GET",
    path: "/node-type-policies/scopes/{scopeId}/attachments",
  },
});
