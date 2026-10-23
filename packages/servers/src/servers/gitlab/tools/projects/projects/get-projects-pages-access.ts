import { defineTool } from '@usemcpkit/core';

export const projectsProjectsGetProjectsPagesAccess = defineTool({
  name: 'projects:projects:get_projects_pages_access',
  description:
    'Verify Pages access to a project. Verifies if the current user can access GitLab Pages in a specified project.',
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
    path: '/projects/{id}/pages_access',
  },
});
