import { defineTool } from '@usemcpkit/core';

export const usersUsersGetUserGroups = defineTool({
  name: 'users:users:get_user_groups',
  description: 'Get user groups. Returns the groups to which a user belongs.',
  input: {
    type: 'object',
    properties: {
      accountId: {
        type: 'string',
        description:
          'The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.',
      },
      username: {
        type: 'string',
        description: 'This parameter is no longer available. See the deprecation notice for details.',
      },
      key: {
        type: 'string',
        description: 'This parameter is no longer available. See the deprecation notice for details.',
      },
    },
    required: ['accountId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/user/groups',
    query: ['accountId', 'username', 'key'],
  },
});
