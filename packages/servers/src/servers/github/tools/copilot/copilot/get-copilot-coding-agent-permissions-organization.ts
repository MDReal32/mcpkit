import { defineTool } from "@usemcpkit/core";

export const copilotCopilotGetCopilotCodingAgentPermissionsOrganization = defineTool({
  name: "copilot:copilot:get_copilot_coding_agent_permissions_organization",
  description:
    "Get Copilot cloud agent permissions for an organization. > [!NOTE] > This endpoint is in public preview and is subject to change.",
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
    path: "/orgs/{org}/copilot/coding-agent/permissions",
  },
});
