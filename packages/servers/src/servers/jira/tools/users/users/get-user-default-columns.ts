import { defineTool } from '@usemcpkit/core';

export const usersUsersGetUserDefaultColumns = defineTool({
  name: 'users:users:get_user_default_columns',
  description:
    "Get user default columns. Returns the default issue table columns for the user. If `accountId` is not passed in the request, the calling user's details are returned.",
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
        description: 'This parameter is no longer available See the deprecation notice for details.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/user/columns',
    query: ['accountId', 'username'],
  },
});
