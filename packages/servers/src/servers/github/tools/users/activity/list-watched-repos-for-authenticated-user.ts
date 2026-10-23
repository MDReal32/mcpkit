import { defineTool } from '@usemcpkit/core';

export const usersActivityListWatchedReposForAuthenticatedUser = defineTool({
  name: 'users:activity:list_watched_repos_for_authenticated_user',
  description:
    'List repositories watched by the authenticated user. Lists repositories the authenticated user is watching.',
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
    path: '/user/subscriptions',
    query: ['per_page', 'page'],
  },
});
