import { defineTool } from "@usemcpkit/core";

export const credentialsTypePoliciesGetCredentialTypePolicyDocument = defineTool({
  name: "credentials:type_policies:get_credential_type_policy_document",
  description:
    "Preview: Retrieve a credential type policy document. **Preview** — breaking changes may still occur without major version bump.",
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
    method: "GET",
    path: "/credential-type-policies/policies/{policyId}",
  },
});
