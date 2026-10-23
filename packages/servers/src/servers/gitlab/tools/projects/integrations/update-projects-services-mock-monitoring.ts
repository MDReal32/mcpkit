import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsUpdateProjectsServicesMockMonitoring = defineTool({
  name: 'projects:integrations:update_projects_services_mock_monitoring',
  description: 'Create or update the Mock Monitoring integration. Creates or updates the Mock Monitoring integration.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      use_inherited_settings: {
        type: 'boolean',
        description: 'Indicates whether to inherit the default settings. Defaults to `false`.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/services/mock-monitoring',
    body: ['use_inherited_settings'],
  },
});
