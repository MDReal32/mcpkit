import { defineTool } from '@usemcpkit/core';

export const usersUsersGetUserEmail = defineTool({
  name: 'users:users:get_user_email',
  description:
    "Get user email. Returns a user's email address regardless of the user's profile visibility settings. For Connect apps, this API is only available to apps approved by Atlassian, according to these guidelines. For Forge apps, this API only supports access via asApp() requests.",
  input: {
    type: 'object',
    properties: {
      accountId: {
        type: 'string',
        description:
          'The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, `5b10ac8d82e05b22cc7d4ef5`.',
      },
    },
    required: ['accountId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/user/email',
    query: ['accountId'],
  },
});
