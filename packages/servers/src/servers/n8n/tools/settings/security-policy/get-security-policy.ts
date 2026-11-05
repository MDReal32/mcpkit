import { defineTool } from "@usemcpkit/core";

export const settingsSecurityPolicyGetSecurityPolicy = defineTool({
  name: "settings:security_policy:get_security_policy",
  description:
    "Retrieve the security policy. Retrieve the instance security policy: personal-space publishing and sharing, the execution-data redaction enforcement floor, and the read-only usage counts shown in the UI. Requires the `securitySettings:manage` scope and the Personal Space Policy feature to be licensed.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/settings/security-policy",
  },
});
