import { defineTool } from '@usemcpkit/core';

export const usersUsersCreateUserEmails = defineTool({
  name: 'users:users:create_user_emails',
  description: 'Add an email address. Adds an email address for the currently authenticated user.',
  input: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'Email address to add to the account.',
      },
    },
    required: ['email'],
  },
  request: {
    method: 'POST',
    path: '/user/emails',
    body: ['email'],
  },
});
