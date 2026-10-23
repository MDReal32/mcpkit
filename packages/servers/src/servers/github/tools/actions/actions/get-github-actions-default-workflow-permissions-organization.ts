import { defineTool } from "@usemcpkit/core";

export const actionsActionsGetGithubActionsDefaultWorkflowPermissionsOrganization = defineTool({
  name: "actions:actions:get_github_actions_default_workflow_permissions_organization",
  description:
    'Get default workflow permissions for an organization. Gets the default workflow permissions granted to the `GITHUB_TOKEN` when running workflows in an organization, as well as whether GitHub Actions can submit approving pull request reviews. For more information, see "Setting the permissions of the GITHUB_TOKEN for your organization."',
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
    path: "/orgs/{org}/actions/permissions/workflow",
  },
});
