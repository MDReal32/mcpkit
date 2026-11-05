import { defineTool } from "@usemcpkit/core";

export const credentialsTypePoliciesCreateCredentialTypePolicyDocument = defineTool({
  name: "credentials:type_policies:create_credential_type_policy_document",
  description:
    "Preview: Create a credential type policy document. **Preview** — breaking changes may still occur without major version bump.",
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
    path: "/credential-type-policies/policies",
    body: ["rules"],
  },
});
