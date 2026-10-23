import { defineTool } from "@usemcpkit/core";

export const actionsActionsSetSelfHostedRunnersPermissionsOrganization = defineTool({
  name: "actions:actions:set_self_hosted_runners_permissions_organization",
  description:
    "Set self-hosted runners settings for an organization. Sets the settings for self-hosted runners for an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      enabled_repositories: {
        type: "string",
        description: "The policy that controls whether self-hosted runners can be used in the organization",
        enum: ["all", "selected", "none"],
      },
    },
    required: ["org", "enabled_repositories"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/actions/permissions/self-hosted-runners",
    body: ["enabled_repositories"],
  },
});
