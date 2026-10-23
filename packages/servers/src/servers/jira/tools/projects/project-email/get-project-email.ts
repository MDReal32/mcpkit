import { defineTool } from '@usemcpkit/core';

export const projectsProjectEmailGetProjectEmail = defineTool({
  name: 'projects:project_email:get_project_email',
  description: "Get project's sender email. Returns the project's sender email address.",
  input: {
    type: 'object',
    properties: {
      projectId: {
        type: 'integer',
        description: 'The project ID.',
      },
    },
    required: ['projectId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/project/{projectId}/email',
  },
});
