import { defineTool } from '@usemcpkit/core';

export const usersListSshSigningKeysForUser = defineTool({
  name: 'users:list_ssh_signing_keys_for_user',
  description:
    'List SSH signing keys for a user. Lists the SSH signing keys for a user. This operation is accessible by anyone.',
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
    path: '/users/{username}/ssh_signing_keys',
    query: ['per_page', 'page'],
  },
});
