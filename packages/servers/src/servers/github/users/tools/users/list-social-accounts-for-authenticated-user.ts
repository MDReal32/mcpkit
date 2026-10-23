import { defineTool } from '@usemcpkit/core';

export const usersListSocialAccountsForAuthenticatedUser = defineTool({
  name: 'users:list_social_accounts_for_authenticated_user',
  description: 'List social accounts for the authenticated user. Lists all of your social accounts.',
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
    path: '/user/social_accounts',
    query: ['per_page', 'page'],
  },
});
