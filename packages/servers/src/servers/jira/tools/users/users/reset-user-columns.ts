import { defineTool } from '@usemcpkit/core';

export const usersUsersResetUserColumns = defineTool({
  name: 'users:users:reset_user_columns',
  description:
    "Reset user default columns. Resets the default issue table columns for the user to the system default. If `accountId` is not passed, the calling user's default columns are reset.",
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
    },
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/user/columns',
    query: ['accountId', 'username'],
  },
});
