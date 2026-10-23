import { defineTool } from '@usemcpkit/core';

export const datacenterAdminUpdateUser = defineTool({
  name: 'datacenter:admin:update_user',
  description:
    '[Data Center] Update user. Updates the user identified by the username. The following fields can be updated: email, full name. "Requirements: - The fullName should not be blank - The fullName should not contain any forbidden characters (< or >) - The fullName should not be anonymous (in english or other system locale) - The email should not be blank - The email should be a valid email address',
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
      },
      fullName: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      currentPassword: {
        type: 'string',
      },
    },
    required: ['username'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/admin/user/{username}',
    body: ['fullName', 'email', 'currentPassword'],
  },
});
