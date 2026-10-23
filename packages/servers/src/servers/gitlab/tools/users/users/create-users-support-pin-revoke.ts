import { defineTool } from '@usemcpkit/core';

export const usersUsersCreateUsersSupportPinRevoke = defineTool({
  name: 'users:users:create_users_support_pin_revoke',
  description:
    'Revoke a Support PIN for a user. Revokes a Support PIN for a specified user. This immediately expires and removes the PIN. Administrators only.',
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
    path: '/users/{id}/support_pin/revoke',
  },
});
