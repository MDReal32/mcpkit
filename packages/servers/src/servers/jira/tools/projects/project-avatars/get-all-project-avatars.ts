import { defineTool } from '@usemcpkit/core';

export const projectsProjectAvatarsGetAllProjectAvatars = defineTool({
  name: 'projects:project_avatars:get_all_project_avatars',
  description: 'Get all project avatars. Returns all project avatars, grouped by system and custom avatars.',
  input: {
    type: 'object',
    properties: {
      projectIdOrKey: {
        type: 'string',
        description: 'The ID or (case-sensitive) key of the project.',
      },
    },
    required: ['projectIdOrKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/project/{projectIdOrKey}/avatars',
  },
});
