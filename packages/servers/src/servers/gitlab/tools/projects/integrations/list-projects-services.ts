import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsListProjectsServices = defineTool({
  name: 'projects:integrations:list_projects_services',
  description: 'List all active integrations. Lists all active integrations.',
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
    path: '/projects/{id}/services',
  },
});
