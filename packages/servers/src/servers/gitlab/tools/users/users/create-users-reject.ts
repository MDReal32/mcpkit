import { defineTool } from '@usemcpkit/core';

export const usersUsersCreateUsersReject = defineTool({
  name: 'users:users:create_users_reject',
  description:
    'Reject access to a user. Rejects access to a specified user account that is pending approval. Administrators only.',
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
    path: '/users/{id}/reject',
  },
});
