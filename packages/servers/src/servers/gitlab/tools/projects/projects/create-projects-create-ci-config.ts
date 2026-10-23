import { defineTool } from '@usemcpkit/core';

export const projectsProjectsCreateProjectsCreateCiConfig = defineTool({
  name: 'projects:projects:create_projects_create_ci_config',
  description:
    'Create a CI configuration merge request. Creates a merge request to add CI configuration to a specified project.',
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
    path: '/projects/{id}/create_ci_config',
  },
});
