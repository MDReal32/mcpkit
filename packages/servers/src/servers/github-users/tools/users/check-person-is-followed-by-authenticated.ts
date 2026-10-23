import { defineTool } from '@usemcpkit/core';

export const usersCheckPersonIsFollowedByAuthenticated = defineTool({
  name: 'users:check_person_is_followed_by_authenticated',
  description: 'Check if a person is followed by the authenticated user',
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
    path: '/user/following/{username}',
  },
});
