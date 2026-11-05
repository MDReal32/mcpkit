import { defineTool } from "@usemcpkit/core";

export const credentialsTypePoliciesDeleteCredentialTypePolicyDocument = defineTool({
  name: "credentials:type_policies:delete_credential_type_policy_document",
  description:
    "Preview: Delete a credential type policy document. **Preview** — breaking changes may still occur without major version bump.",
  input: {
    type: "object",
    properties: {
      policyId: {
        type: "string",
        description: "The ID of the credential type policy document.",
      },
    },
    required: ["policyId"],
  },
  request: {
    method: "DELETE",
    path: "/credential-type-policies/policies/{policyId}",
  },
});
