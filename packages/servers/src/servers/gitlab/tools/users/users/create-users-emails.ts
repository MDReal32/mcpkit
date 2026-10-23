import { defineTool } from '@usemcpkit/core';

export const usersUsersCreateUsersEmails = defineTool({
  name: 'users:users:create_users_emails',
  description:
    'Add an email address for a user. Adds an email address for a specified user account. Administrators only.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the user.',
      },
      email: {
        type: 'string',
        description: 'Email address to add to the user account.',
      },
      skip_confirmation: {
        type: 'boolean',
        description: 'If `true`, skips email confirmation and assumes the email is verified.',
      },
    },
    required: ['id', 'email'],
  },
  request: {
    method: 'POST',
    path: '/users/{id}/emails',
    body: ['email', 'skip_confirmation'],
  },
});
