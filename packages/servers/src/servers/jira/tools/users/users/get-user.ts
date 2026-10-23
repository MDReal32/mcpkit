import { defineTool } from '@usemcpkit/core';

export const usersUsersGetUser = defineTool({
  name: 'users:users:get_user',
  description: 'Get user. Returns a user.',
  input: {
    type: 'object',
    properties: {
      accountId: {
        type: 'string',
        description:
          'The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required.',
      },
      username: {
        type: 'string',
        description: 'This parameter is no longer available. See the deprecation notice for details.',
      },
      key: {
        type: 'string',
        description: 'This parameter is no longer available. See the deprecation notice for details.',
      },
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information about users in the response. This parameter accepts a comma-separated list. Expand options include:',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/user',
    query: ['accountId', 'username', 'key', 'expand'],
  },
});
