import { defineTool } from '@usemcpkit/core';

export const actionsActionsListSelectedRepositoriesEnabledGithubActionsOrganization = defineTool({
  name: 'actions:actions:list_selected_repositories_enabled_github_actions_organization',
  description:
    'List selected repositories enabled for GitHub Actions in an organization. Lists the selected repositories that are enabled for GitHub Actions in an organization. To use this endpoint, the organization permission policy for `enabled_repositories` must be configured to `selected`. For more information, see "Set GitHub Actions permissions for an organization."',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/actions/permissions/repositories',
    query: ['per_page', 'page'],
  },
});
