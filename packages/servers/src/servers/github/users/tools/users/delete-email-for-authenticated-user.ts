import { defineTool } from '@usemcpkit/core';

export const usersDeleteEmailForAuthenticatedUser = defineTool({
  name: 'users:delete_email_for_authenticated_user',
  description:
    'Delete an email address for the authenticated user. OAuth app tokens and personal access tokens (classic) need the `user` scope to use this endpoint.',
  input: {
    type: 'object',
    properties: {
      emails: {
        type: 'array',
        description: 'Email addresses associated with the GitHub user account.',
        items: {
          type: 'string',
        },
      },
    },
  },
  request: {
    method: 'DELETE',
    path: '/user/emails',
    body: ['emails'],
  },
});
