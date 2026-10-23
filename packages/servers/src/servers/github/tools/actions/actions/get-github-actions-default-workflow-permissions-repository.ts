import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetGithubActionsDefaultWorkflowPermissionsRepository = defineTool({
  name: 'actions:actions:get_github_actions_default_workflow_permissions_repository',
  description:
    'Get default workflow permissions for a repository. Gets the default workflow permissions granted to the `GITHUB_TOKEN` when running workflows in a repository, as well as if GitHub Actions can submit approving pull request reviews. For more information, see "Setting the permissions of the GITHUB_TOKEN for your repository."',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/permissions/workflow',
  },
});
