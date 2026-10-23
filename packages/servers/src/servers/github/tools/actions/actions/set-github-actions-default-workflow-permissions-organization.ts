import { defineTool } from "@usemcpkit/core";

export const actionsActionsSetGithubActionsDefaultWorkflowPermissionsOrganization = defineTool({
  name: "actions:actions:set_github_actions_default_workflow_permissions_organization",
  description:
    'Set default workflow permissions for an organization. Sets the default workflow permissions granted to the `GITHUB_TOKEN` when running workflows in an organization, and sets if GitHub Actions can submit approving pull request reviews. For more information, see "Setting the permissions of the GITHUB_TOKEN for your organization."',
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      default_workflow_permissions: {
        type: "string",
        description: "The default workflow permissions granted to the GITHUB_TOKEN when running workflows.",
        enum: ["read", "write"],
      },
      can_approve_pull_request_reviews: {
        type: "boolean",
        description: "Whether GitHub Actions can approve pull requests. Enabling this can be a security risk.",
      },
    },
    required: ["org"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/actions/permissions/workflow",
    body: ["default_workflow_permissions", "can_approve_pull_request_reviews"],
  },
});
