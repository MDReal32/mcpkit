import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetAllowedActionsRepository = defineTool({
  name: 'actions:actions:get_allowed_actions_repository',
  description:
    'Get allowed actions and reusable workflows for a repository. Gets the settings for selected actions and reusable workflows that are allowed in a repository. To use this endpoint, the repository policy for `allowed_actions` must be configured to `selected`. For more information, see "Set GitHub Actions permissions for a repository."',
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
    path: '/repos/{owner}/{repo}/actions/permissions/selected-actions',
  },
});
