import { defineTool } from '@usemcpkit/core';

export const actionsListSelectedReposForOrgVariable = defineTool({
  name: 'actions:list_selected_repos_for_org_variable',
  description:
    'List selected repositories for an organization variable. Lists all repositories that can access an organization variable that is available to selected repositories.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      name: {
        type: 'string',
        description: 'The name of the variable.',
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
    required: ['org', 'name'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/actions/variables/{name}/repositories',
    query: ['page', 'per_page'],
  },
});
