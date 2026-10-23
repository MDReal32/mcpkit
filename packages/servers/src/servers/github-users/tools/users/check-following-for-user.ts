import { defineTool } from '@usemcpkit/core';

export const usersCheckFollowingForUser = defineTool({
  name: 'users:check_following_for_user',
  description: 'Check if a user follows another user',
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
      target_user: {
        type: 'string',
      },
    },
    required: ['username', 'target_user'],
  },
  request: {
    method: 'GET',
    path: '/users/{username}/following/{target_user}',
  },
});
