import { defineTool } from '@usemcpkit/core';

export const usersActivityListReposWatchedByUser = defineTool({
  name: 'users:activity:list_repos_watched_by_user',
  description: 'List repositories watched by a user. Lists repositories a user is watching.',
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
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
    required: ['username'],
  },
  request: {
    method: 'GET',
    path: '/users/{username}/subscriptions',
    query: ['per_page', 'page'],
  },
});
