import { defineTool } from '@usemcpkit/core';

export const usersUnblock = defineTool({
  name: 'users:unblock',
  description: 'Unblock a user. Unblocks the given user and returns a 204.',
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
    method: 'DELETE',
    path: '/user/blocks/{username}',
  },
});
