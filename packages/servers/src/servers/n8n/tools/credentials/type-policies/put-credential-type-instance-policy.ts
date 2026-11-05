import { defineTool } from "@usemcpkit/core";

export const credentialsTypePoliciesPutCredentialTypeInstancePolicy = defineTool({
  name: "credentials:type_policies:put_credential_type_instance_policy",
  description:
    "Preview: Replace the instance credential type policy. **Preview** — breaking changes may still occur without major version bump.",
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
      defaultAction: {
        type: "string",
        enum: ["allow", "deny", "delegate"],
      },
      version: {
        type: "integer",
      },
    },
    required: ["rules", "defaultAction", "version"],
  },
  request: {
    method: "PUT",
    path: "/credential-type-policies/instance",
    body: ["rules", "defaultAction", "version"],
  },
});
