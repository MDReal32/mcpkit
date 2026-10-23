import { defineTool } from '@usemcpkit/core';

export const usersUsersGetUsersStatus = defineTool({
  name: 'users:users:get_users_status',
  description:
    'Retrieve the status of a user. Retrieves the status of a user. You can access this endpoint without authentication.',
  input: {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
        description: 'ID or username of the user.',
      },
    },
    required: ['user_id'],
  },
  request: {
    method: 'GET',
    path: '/users/{user_id}/status',
  },
});
