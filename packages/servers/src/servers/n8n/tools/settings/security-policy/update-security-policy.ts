import { defineTool } from "@usemcpkit/core";

export const settingsSecurityPolicyUpdateSecurityPolicy = defineTool({
  name: "settings:security_policy:update_security_policy",
  description:
    "Set the security policy. Replace the instance security policy with the provided full object. Every writable field must be sent. Read-only usage counts from GET are ignored if included, so a GET response can be sent back as a PUT body. The update takes effect exactly as it would from the UI, using the same validation. Requires the `securitySettings:manage` scope and the Personal Space Policy feature to be licensed. When t…",
  input: {
    type: "object",
    properties: {
      personalSpacePublishing: {
        type: "boolean",
        description: "Whether members may publish workflows and agents from their personal space.",
      },
      personalSpaceSharing: {
        type: "boolean",
        description: "Whether members may share workflows and credentials from their personal space.",
      },
      redactionEnforcement: {
        type: "object",
        properties: {
          floor: {
            type: "string",
            description: "Minimum execution-data redaction level enforced across the instance.",
            enum: ["off", "production", "all"],
          },
        },
        required: ["floor"],
      },
      publishedPersonalWorkflowsCount: {
        type: "integer",
        description:
          "Read-only usage count returned by GET. Ignored on write so a GET response can be sent back as a PUT body.",
      },
      sharedPersonalWorkflowsCount: {
        type: "integer",
        description:
          "Read-only usage count returned by GET. Ignored on write so a GET response can be sent back as a PUT body.",
      },
      sharedPersonalCredentialsCount: {
        type: "integer",
        description:
          "Read-only usage count returned by GET. Ignored on write so a GET response can be sent back as a PUT body.",
      },
    },
    required: ["personalSpacePublishing", "personalSpaceSharing", "redactionEnforcement"],
  },
  request: {
    method: "PUT",
    path: "/settings/security-policy",
    body: [
      "personalSpacePublishing",
      "personalSpaceSharing",
      "redactionEnforcement",
      "publishedPersonalWorkflowsCount",
      "sharedPersonalWorkflowsCount",
      "sharedPersonalCredentialsCount",
    ],
  },
});
