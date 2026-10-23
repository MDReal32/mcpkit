import { defineTool } from '@usemcpkit/core';

export const actionsActionsSetGithubActionsPermissionsRepository = defineTool({
  name: 'actions:actions:set_github_actions_permissions_repository',
  description:
    'Set GitHub Actions permissions for a repository. Sets the GitHub Actions permissions policy for enabling GitHub Actions and allowed actions and reusable workflows in the repository.',
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
      enabled: {
        type: 'boolean',
        description: 'Whether GitHub Actions is enabled on the repository.',
      },
      allowed_actions: {
        type: 'string',
        description: 'The permissions policy that controls the actions and reusable workflows that are allowed to run.',
        enum: ['all', 'local_only', 'selected'],
      },
      sha_pinning_required: {
        type: 'boolean',
        description: 'Whether actions must be pinned to a full-length commit SHA.',
      },
    },
    required: ['owner', 'repo', 'enabled'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/actions/permissions',
    body: ['enabled', 'allowed_actions', 'sha_pinning_required'],
  },
});
