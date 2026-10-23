import { defineTool } from "@usemcpkit/core";

export const actionsActionsSetForkPrContributorApprovalPermissionsOrganization = defineTool({
  name: "actions:actions:set_fork_pr_contributor_approval_permissions_organization",
  description:
    "Set fork PR contributor approval permissions for an organization. Sets the fork PR contributor approval policy for an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      approval_policy: {
        type: "string",
        description: "The policy that controls when fork PR workflows require approval from a maintainer.",
        enum: ["first_time_contributors_new_to_github", "first_time_contributors", "all_external_contributors"],
      },
    },
    required: ["org", "approval_policy"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/actions/permissions/fork-pr-contributor-approval",
    body: ["approval_policy"],
  },
});
