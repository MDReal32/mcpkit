import { defineTool } from '@usemcpkit/core';

export const usersUnfollow = defineTool({
  name: 'users:unfollow',
  description:
    'Unfollow a user. OAuth app tokens and personal access tokens (classic) need the `user:follow` scope to use this endpoint.',
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
    method: 'DELETE',
    path: '/user/following/{username}',
  },
});
