import { defineTool } from '@usemcpkit/core';

export const usersUsersList = defineTool({
  name: 'users:users:list',
  description:
    'List users. Lists all users, in the order that they signed up on GitHub. This list includes personal user accounts and organization accounts.',
  input: {
    type: 'object',
    properties: {
      since: {
        type: 'integer',
        description: 'A user ID. Only return users with an ID greater than this ID.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/users',
    query: ['since', 'per_page'],
  },
});
