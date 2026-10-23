import { defineTool } from '@usemcpkit/core';

export const actionsListSelectedReposForOrgSecret = defineTool({
  name: 'actions:list_selected_repos_for_org_secret',
  description:
    'List selected repositories for an organization secret. Lists all repositories that have been selected when the `visibility` for repository access to a secret is set to `selected`.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      secret_name: {
        type: 'string',
        description: 'The name of the secret.',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['org', 'secret_name'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/actions/secrets/{secret_name}/repositories',
    query: ['page', 'per_page'],
  },
});
