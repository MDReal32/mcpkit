import { defineTool } from '@usemcpkit/core';

export const usersUsersCreateUserSupportPin = defineTool({
  name: 'users:users:create_user_support_pin',
  description:
    'Create a Support PIN. Creates a Support PIN. The PIN expires seven days after creation. GitLab Support may ask for this PIN to validate your identity.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'POST',
    path: '/user/support_pin',
  },
});
