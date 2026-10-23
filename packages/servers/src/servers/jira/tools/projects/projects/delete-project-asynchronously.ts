import { defineTool } from '@usemcpkit/core';

export const projectsProjectsDeleteProjectAsynchronously = defineTool({
  name: 'projects:projects:delete_project_asynchronously',
  description: 'Delete project asynchronously. Deletes a project asynchronously.',
  input: {
    type: 'object',
    properties: {
      projectIdOrKey: {
        type: 'string',
        description: 'The project ID or project key (case sensitive).',
      },
    },
    required: ['projectIdOrKey'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/project/{projectIdOrKey}/delete',
  },
});
