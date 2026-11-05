import { defineTool } from "@usemcpkit/core";

export const credentialsTypePoliciesReplaceCredentialTypePolicyAttachments = defineTool({
  name: "credentials:type_policies:replace_credential_type_policy_attachments",
  description:
    "Preview: Replace a scope's attached policy documents. **Preview** — breaking changes may still occur without major version bump.",
  input: {
    type: "object",
    properties: {
      scopeId: {
        type: "string",
        description: "The ID of the credential type policy scope.",
      },
      attachments: {
        type: "array",
        items: {
          type: "object",
          properties: {
            policyId: {
              type: "string",
            },
            priority: {
              type: "integer",
            },
            isFloor: {
              type: "boolean",
            },
          },
          required: ["policyId", "priority", "isFloor"],
        },
      },
      version: {
        type: "integer",
      },
    },
    required: ["scopeId", "attachments", "version"],
  },
  request: {
    method: "PUT",
    path: "/credential-type-policies/scopes/{scopeId}/attachments",
    body: ["attachments", "version"],
  },
});
