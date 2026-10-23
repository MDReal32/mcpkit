import { defineTool } from "@usemcpkit/core";

export const securityCodeSecurityGetDefaultConfigurations = defineTool({
  name: "security:code_security:get_default_configurations",
  description:
    "Get default code security configurations. Lists the default code security configurations for an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
    },
    required: ["org"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/code-security/configurations/defaults",
  },
});
