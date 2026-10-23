import { defineTool } from '@usemcpkit/core';

export const usersUsersUpdateUsersDisableTwoFactor = defineTool({
  name: 'users:users:update_users_disable_two_factor',
  description:
    'Disable two-factor authentication for a user. Disables two-factor authentication for a specified user account. Administrators only.',
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
    method: 'PATCH',
    path: '/users/{id}/disable_two_factor',
  },
});
