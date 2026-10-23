import { defineTool } from "@usemcpkit/core";

export const securityCodeSecurityAttachConfiguration = defineTool({
  name: "security:code_security:attach_configuration",
  description:
    "Attach a configuration to repositories. Attach a code security configuration to a set of repositories. If the repositories specified are already attached to a configuration, they will be re-attached to the provided configuration.",
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
      scope: {
        type: "string",
        description:
          "The type of repositories to attach the configuration to. `selected` means the configuration will be attached to only the repositories specified by `selected_repository_ids`",
        enum: ["all", "all_without_configurations", "public", "private_or_internal", "selected"],
      },
      selected_repository_ids: {
        type: "array",
        description:
          "An array of repository IDs to attach the configuration to. You can only provide a list of repository ids when the `scope` is set to `selected`.",
        items: {
          type: "integer",
          description: "Unique identifier of the repository.",
        },
      },
    },
    required: ["org", "configuration_id", "scope"],
  },
  request: {
    method: "POST",
    path: "/orgs/{org}/code-security/configurations/{configuration_id}/attach",
    body: ["scope", "selected_repository_ids"],
  },
});
