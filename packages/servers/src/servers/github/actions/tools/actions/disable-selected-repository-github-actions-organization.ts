import { defineTool } from '@usemcpkit/core';

export const actionsDisableSelectedRepositoryGithubActionsOrganization = defineTool({
  name: 'actions:disable_selected_repository_github_actions_organization',
  description:
    'Disable a selected repository for GitHub Actions in an organization. Removes a repository from the list of selected repositories that are enabled for GitHub Actions in an organization. To use this endpoint, the organization permission policy for `enabled_repositories` must be configured to `selected`. For more information, see "Set GitHub Actions permissions for an organization."',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      repository_id: {
        type: 'integer',
        description: 'The unique identifier of the repository.',
      },
    },
    required: ['org', 'repository_id'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/actions/permissions/repositories/{repository_id}',
  },
});
