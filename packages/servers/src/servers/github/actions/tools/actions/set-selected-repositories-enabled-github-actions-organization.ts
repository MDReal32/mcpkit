import { defineTool } from '@usemcpkit/core';

export const actionsSetSelectedRepositoriesEnabledGithubActionsOrganization = defineTool({
  name: 'actions:set_selected_repositories_enabled_github_actions_organization',
  description:
    'Set selected repositories enabled for GitHub Actions in an organization. Replaces the list of selected repositories that are enabled for GitHub Actions in an organization. To use this endpoint, the organization permission policy for `enabled_repositories` must be configured to `selected`. For more information, see "Set GitHub Actions permissions for an organization."',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      selected_repository_ids: {
        type: 'array',
        description: 'List of repository IDs to enable for GitHub Actions.',
        items: {
          type: 'integer',
          description: 'Unique identifier of the repository.',
        },
      },
    },
    required: ['org', 'selected_repository_ids'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/actions/permissions/repositories',
    body: ['selected_repository_ids'],
  },
});
