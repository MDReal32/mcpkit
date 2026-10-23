import { defineTool } from '@usemcpkit/core';

export const usersUsersGetUserCounts = defineTool({
  name: 'users:users:get_user_counts',
  description: 'Return the user specific counts. Assigned open issues, assigned MRs and pending todos count',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/user_counts',
  },
});
