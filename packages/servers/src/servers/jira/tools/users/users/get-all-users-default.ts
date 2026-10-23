import { defineTool } from '@usemcpkit/core';

export const usersUsersGetAllUsersDefault = defineTool({
  name: 'users:users:get_all_users_default',
  description:
    'Get all users default. Returns a list of all users, including active users, inactive users and previously deleted users that have an Atlassian account.',
  input: {
    type: 'object',
    properties: {
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The index of the first item to return.',
      },
      maxResults: {
        type: 'integer',
        default: 50,
        description: 'The maximum number of items to return (limited to 1000).',
      },
      expand: {
        type: 'string',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/users',
    query: ['startAt', 'maxResults', 'expand'],
  },
});
