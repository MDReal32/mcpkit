import { defineTool } from '@usemcpkit/core';

export const usersFollow = defineTool({
  name: 'users:follow',
  description:
    'Follow a user. Note that you\'ll need to set `Content-Length` to zero when calling out to this endpoint. For more information, see "HTTP verbs."',
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
    method: 'PUT',
    path: '/user/following/{username}',
  },
});
