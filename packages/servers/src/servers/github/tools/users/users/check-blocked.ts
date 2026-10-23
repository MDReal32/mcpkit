import { defineTool } from '@usemcpkit/core';

export const usersUsersCheckBlocked = defineTool({
  name: 'users:users:check_blocked',
  description:
    'Check if a user is blocked by the authenticated user. Returns a 204 if the given user is blocked by the authenticated user. Returns a 404 if the given user is not blocked by the authenticated user, or if the given user account has been identified as spam by GitHub.',
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
    },
    required: ['username'],
  },
  request: {
    method: 'GET',
    path: '/user/blocks/{username}',
  },
});
