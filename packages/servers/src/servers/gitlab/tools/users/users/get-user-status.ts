import { defineTool } from '@usemcpkit/core';

export const usersUsersGetUserStatus = defineTool({
  name: 'users:users:get_user_status',
  description: 'Retrieve your user status. Retrieves your user status.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/user/status',
  },
});
