import { defineTool } from '@usemcpkit/core';

export const projectsProjectAvatarsDeleteProjectAvatar = defineTool({
  name: 'projects:project_avatars:delete_project_avatar',
  description:
    'Delete project avatar. Deletes a custom avatar from a project. Note that system avatars cannot be deleted.',
  input: {
    type: 'object',
    properties: {
      projectIdOrKey: {
        type: 'string',
        description: 'The project ID or (case-sensitive) key.',
      },
      id: {
        type: 'integer',
        description: 'The ID of the avatar.',
      },
    },
    required: ['projectIdOrKey', 'id'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/project/{projectIdOrKey}/avatar/{id}',
  },
});
