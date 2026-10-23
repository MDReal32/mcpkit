import { defineTool } from '@usemcpkit/core';

export const projectsHooksGetProjectsHooks = defineTool({
  name: 'projects:hooks:get_projects_hooks',
  description: 'Retrieve a project webhook. Retrieves a specified webhook for a project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      hook_id: {
        type: 'integer',
        description: 'ID of the project webhook.',
      },
    },
    required: ['id', 'hook_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/hooks/{hook_id}',
  },
});
