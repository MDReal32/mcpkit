import { defineTool } from "@usemcpkit/core";

export const securityCodeSecuritySetConfigurationAsDefault = defineTool({
  name: "security:code_security:set_configuration_as_default",
  description:
    "Set a code security configuration as a default for an organization. Sets a code security configuration as a default to be applied to new repositories in your organization.",
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
      default_for_new_repos: {
        type: "string",
        description: "Specify which types of repository this security configuration should be applied to by default.",
        enum: ["all", "none", "private_and_internal", "public"],
      },
    },
    required: ["org", "configuration_id"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/code-security/configurations/{configuration_id}/defaults",
    body: ["default_for_new_repos"],
  },
});
