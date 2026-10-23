import { defineTool } from '@usemcpkit/core';

export const usersBlock = defineTool({
  name: 'users:block',
  description:
    'Block a user. Blocks the given user and returns a 204. If the authenticated user cannot block the given user a 422 is returned.',
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
    },
    required: ['username'],
  },
  request: {
    method: 'PUT',
    path: '/user/blocks/{username}',
  },
});
