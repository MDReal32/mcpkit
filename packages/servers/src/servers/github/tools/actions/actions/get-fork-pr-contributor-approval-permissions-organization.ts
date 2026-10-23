import { defineTool } from "@usemcpkit/core";

export const actionsActionsGetForkPrContributorApprovalPermissionsOrganization = defineTool({
  name: "actions:actions:get_fork_pr_contributor_approval_permissions_organization",
  description:
    "Get fork PR contributor approval permissions for an organization. Gets the fork PR contributor approval policy for an organization.",
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
    path: "/orgs/{org}/actions/permissions/fork-pr-contributor-approval",
  },
});
