import { defineTool } from '@usemcpkit/core';

export const orgsMigrationsListReposForOrg = defineTool({
  name: 'orgs:migrations:list_repos_for_org',
  description:
    'List repositories in an organization migration. List all the repositories for this organization migration.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      migration_id: {
        type: 'integer',
        description: 'The unique identifier of the migration.',
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
    required: ['org', 'migration_id'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/migrations/{migration_id}/repositories',
    query: ['per_page', 'page'],
  },
});
