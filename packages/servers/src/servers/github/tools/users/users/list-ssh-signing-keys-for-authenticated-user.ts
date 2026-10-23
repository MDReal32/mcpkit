import { defineTool } from '@usemcpkit/core';

export const usersUsersListSshSigningKeysForAuthenticatedUser = defineTool({
  name: 'users:users:list_ssh_signing_keys_for_authenticated_user',
  description:
    "List SSH signing keys for the authenticated user. Lists the SSH signing keys for the authenticated user's GitHub account.",
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
    path: '/user/ssh_signing_keys',
    query: ['per_page', 'page'],
  },
});
