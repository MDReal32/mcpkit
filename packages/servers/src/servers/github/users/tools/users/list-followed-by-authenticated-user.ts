import { defineTool } from '@usemcpkit/core';

export const usersListFollowedByAuthenticatedUser = defineTool({
  name: 'users:list_followed_by_authenticated_user',
  description: 'List the people the authenticated user follows. Lists the people who the authenticated user follows.',
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
    path: '/user/following',
    query: ['per_page', 'page'],
  },
});
