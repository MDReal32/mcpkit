import { defineTool } from '@usemcpkit/core';

export const actionsGetGithubActionsPermissionsRepository = defineTool({
  name: 'actions:get_github_actions_permissions_repository',
  description:
    'Get GitHub Actions permissions for a repository. Gets the GitHub Actions permissions policy for a repository, including whether GitHub Actions is enabled and the actions and reusable workflows allowed to run in the repository.',
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
    path: '/repos/{owner}/{repo}/actions/permissions',
  },
});
