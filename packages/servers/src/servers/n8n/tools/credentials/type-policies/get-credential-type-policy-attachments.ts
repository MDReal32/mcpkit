import { defineTool } from "@usemcpkit/core";

export const credentialsTypePoliciesGetCredentialTypePolicyAttachments = defineTool({
  name: "credentials:type_policies:get_credential_type_policy_attachments",
  description:
    "Preview: Retrieve a scope's attached policy documents. **Preview** — breaking changes may still occur without major version bump.",
  input: {
    type: "object",
    properties: {
      scopeId: {
        type: "string",
        description: "The ID of the credential type policy scope.",
      },
    },
    required: ["scopeId"],
  },
  request: {
    method: "GET",
    path: "/credential-type-policies/scopes/{scopeId}/attachments",
  },
});
