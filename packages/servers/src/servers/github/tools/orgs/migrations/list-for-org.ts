import { defineTool } from '@usemcpkit/core';

export const orgsMigrationsListForOrg = defineTool({
  name: 'orgs:migrations:list_for_org',
  description:
    'List organization migrations. Lists the most recent migrations, including both exports (which can be started through the REST API) and imports (which cannot be started using the REST API).',
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
      exclude: {
        type: 'string',
        description: 'Exclude attributes from the API response to improve performance (comma-separated)',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/migrations',
    query: ['per_page', 'page', 'exclude'],
  },
});
