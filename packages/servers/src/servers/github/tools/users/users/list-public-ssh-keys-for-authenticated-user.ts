import { defineTool } from '@usemcpkit/core';

export const usersUsersListPublicSshKeysForAuthenticatedUser = defineTool({
  name: 'users:users:list_public_ssh_keys_for_authenticated_user',
  description:
    "List public SSH keys for the authenticated user. Lists the public SSH keys for the authenticated user's GitHub account.",
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
    path: '/user/keys',
    query: ['per_page', 'page'],
  },
});
