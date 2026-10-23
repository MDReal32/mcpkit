import { defineTool } from '@usemcpkit/core';

export const appsAppsListReposAccessibleToInstallation = defineTool({
  name: 'apps:apps:list_repos_accessible_to_installation',
  description:
    'List repositories accessible to the app installation. List repositories that an app installation can access.',
  input: {
    type: 'object',
    properties: {
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
  },
  request: {
    method: 'GET',
    path: '/installation/repositories',
    query: ['per_page', 'page'],
  },
});
