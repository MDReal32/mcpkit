import { defineTool } from '@usemcpkit/core';

export const usersUsersCreateUsersFollow = defineTool({
  name: 'users:users:create_users_follow',
  description: 'Follow a user. Follows a specified user account.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the user.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/users/{id}/follow',
  },
});
