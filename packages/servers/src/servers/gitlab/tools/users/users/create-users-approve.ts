import { defineTool } from '@usemcpkit/core';

export const usersUsersCreateUsersApprove = defineTool({
  name: 'users:users:create_users_approve',
  description:
    'Approve access to a user. Approves access to a specified user account that is pending approval. Administrators only.',
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
    path: '/users/{id}/approve',
  },
});
