import { defineTool } from '@usemcpkit/core';

export const usersUsersGetUserEmailBulk = defineTool({
  name: 'users:users:get_user_email_bulk',
  description:
    "Get user email bulk. Returns a user's email address regardless of the user's profile visibility settings. For Connect apps, this API is only available to apps approved by Atlassian, according to these guidelines. For Forge apps, this API only supports access via asApp() requests.",
  input: {
    type: 'object',
    properties: {
      accountId: {
        type: 'string',
        description:
          'The account IDs of the users for which emails are required. An `accountId` is an identifier that uniquely identifies the user across all Atlassian products. For example, `5b10ac8d82e05b22cc7d4ef5`. Note, this should be treated as an opaque identifier (that is, do not assume any structure in the value). (comma-separated)',
      },
    },
    required: ['accountId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/user/email/bulk',
    query: ['accountId'],
  },
});
