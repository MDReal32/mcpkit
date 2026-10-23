import { defineTool } from '@usemcpkit/core';

export const actionsActionsSetGithubActionsPermissionsOrganization = defineTool({
  name: 'actions:actions:set_github_actions_permissions_organization',
  description:
    'Set GitHub Actions permissions for an organization. Sets the GitHub Actions permissions policy for repositories and allowed actions and reusable workflows in an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      enabled_repositories: {
        type: 'string',
        description:
          'The policy that controls the repositories in the organization that are allowed to run GitHub Actions.',
        enum: ['all', 'none', 'selected'],
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
    required: ['org', 'enabled_repositories'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/actions/permissions',
    body: ['enabled_repositories', 'allowed_actions', 'sha_pinning_required'],
  },
});
