import { defineTool } from "@usemcpkit/core";

export const actionsActionsSetGithubActionsDefaultWorkflowPermissionsRepository = defineTool({
  name: "actions:actions:set_github_actions_default_workflow_permissions_repository",
  description:
    'Set default workflow permissions for a repository. Sets the default workflow permissions granted to the `GITHUB_TOKEN` when running workflows in a repository, and sets if GitHub Actions can submit approving pull request reviews. For more information, see "Setting the permissions of the GITHUB_TOKEN for your repository."',
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
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
    required: ["owner", "repo"],
  },
  request: {
    method: "PUT",
    path: "/repos/{owner}/{repo}/actions/permissions/workflow",
    body: ["default_workflow_permissions", "can_approve_pull_request_reviews"],
  },
});
