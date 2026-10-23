import { defineTool } from '@usemcpkit/core';

export const usersUsersGetUser = defineTool({
  name: 'users:users:get_user',
  description: 'Retrieve current user details. Retrieves details about your user account.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/user',
  },
});
