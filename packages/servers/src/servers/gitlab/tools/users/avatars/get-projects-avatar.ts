import { defineTool } from '@usemcpkit/core';

export const usersAvatarsGetProjectsAvatar = defineTool({
  name: 'users:avatars:get_projects_avatar',
  description:
    'Download a project avatar. Downloads a project avatar. You can access this endpoint without authentication if the project is publicly accessible. This feature was introduced in GitLab 16.9.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/avatar',
  },
});
