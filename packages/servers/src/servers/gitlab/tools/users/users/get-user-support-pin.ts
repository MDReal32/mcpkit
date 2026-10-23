import { defineTool } from '@usemcpkit/core';

export const usersUsersGetUserSupportPin = defineTool({
  name: 'users:users:get_user_support_pin',
  description:
    'Retrieve Support PIN. Retrieves a Support PIN for the currently authenticated user. GitLab Support may ask for this PIN to validate your identity.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/user/support_pin',
  },
});
