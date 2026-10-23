import { defineTool } from '@usemcpkit/core';

export const projectsProjectsCreateProjectsStar = defineTool({
  name: 'projects:projects:create_projects_star',
  description: 'Star a project. Stars a specified project.',
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
    method: 'POST',
    path: '/projects/{id}/star',
  },
});
