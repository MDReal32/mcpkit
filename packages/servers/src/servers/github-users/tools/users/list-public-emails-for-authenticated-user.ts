import { defineTool } from '@usemcpkit/core';

export const usersListPublicEmailsForAuthenticatedUser = defineTool({
  name: 'users:list_public_emails_for_authenticated_user',
  description:
    'List public email addresses for the authenticated user. Lists your publicly visible email address, which you can set with the Set primary email visibility for the authenticated user endpoint.',
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
    path: '/user/public_emails',
    query: ['per_page', 'page'],
  },
});
