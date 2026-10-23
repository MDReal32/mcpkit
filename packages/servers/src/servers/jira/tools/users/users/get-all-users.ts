import { defineTool } from '@usemcpkit/core';

export const usersUsersGetAllUsers = defineTool({
  name: 'users:users:get_all_users',
  description:
    'Get all users. Returns a list of all users, including active users, inactive users and previously deleted users that have an Atlassian account.',
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
    path: '/rest/api/2/users/search',
    query: ['startAt', 'maxResults', 'expand'],
  },
});
