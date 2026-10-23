import { defineTool } from '@usemcpkit/core';

export const cloudV1UserGetAnonymousUser = defineTool({
  name: 'cloud_v1:user:get_anonymous_user',
  description:
    '[Cloud v1] Get anonymous user. Returns information about how anonymous users are represented, like the profile picture and display name.',
  input: {
    type: 'object',
    properties: {
      expand: {
        type: 'string',
        description: 'A multi-value parameter indicating which properties of the user to expand. (comma-separated)',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/wiki/rest/api/user/anonymous',
    query: ['expand'],
  },
});
