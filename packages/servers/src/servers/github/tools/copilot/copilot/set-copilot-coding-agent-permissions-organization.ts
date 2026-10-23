import { defineTool } from "@usemcpkit/core";

export const copilotCopilotSetCopilotCodingAgentPermissionsOrganization = defineTool({
  name: "copilot:copilot:set_copilot_coding_agent_permissions_organization",
  description:
    "Set Copilot cloud agent permissions for an organization. > [!NOTE] > This endpoint is in public preview and is subject to change.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      enabled_repositories: {
        type: "string",
        description:
          "The policy for which repositories can use Copilot cloud agent. Can be one of `all`, `selected`, or `none`.",
        enum: ["all", "selected", "none"],
      },
    },
    required: ["org", "enabled_repositories"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/copilot/coding-agent/permissions",
    body: ["enabled_repositories"],
  },
});
