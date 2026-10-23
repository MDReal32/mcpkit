import { defineTool } from '@usemcpkit/core';

export const usersUsersListFollowersForAuthenticatedUser = defineTool({
  name: 'users:users:list_followers_for_authenticated_user',
  description: 'List followers of the authenticated user. Lists the people following the authenticated user.',
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
    path: '/user/followers',
    query: ['per_page', 'page'],
  },
});
