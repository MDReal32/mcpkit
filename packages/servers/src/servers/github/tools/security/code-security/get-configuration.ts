import { defineTool } from "@usemcpkit/core";

export const securityCodeSecurityGetConfiguration = defineTool({
  name: "security:code_security:get_configuration",
  description: "Get a code security configuration. Gets a code security configuration available in an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      configuration_id: {
        type: "integer",
        description: "The unique identifier of the code security configuration.",
      },
    },
    required: ["org", "configuration_id"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/code-security/configurations/{configuration_id}",
  },
});
