import { defineTool } from '@usemcpkit/core';

export const usersUsersCreateUsersBlock = defineTool({
  name: 'users:users:create_users_block',
  description: 'Block access to a user. Blocks a specified user account. Administrators only.',
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
    path: '/users/{id}/block',
  },
});
