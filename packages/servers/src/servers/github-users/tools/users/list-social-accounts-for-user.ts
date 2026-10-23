import { defineTool } from '@usemcpkit/core';

export const usersListSocialAccountsForUser = defineTool({
  name: 'users:list_social_accounts_for_user',
  description:
    'List social accounts for a user. Lists social media accounts for a user. This endpoint is accessible by anyone.',
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
    path: '/users/{username}/social_accounts',
    query: ['per_page', 'page'],
  },
});
