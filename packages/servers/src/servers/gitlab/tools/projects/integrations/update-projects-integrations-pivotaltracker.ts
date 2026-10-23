import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsUpdateProjectsIntegrationsPivotaltracker = defineTool({
  name: 'projects:integrations:update_projects_integrations_pivotaltracker',
  description: 'Create or update the Pivotaltracker integration. Creates or updates the Pivotaltracker integration.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      token: {
        type: 'string',
        description: 'The Pivotal Tracker token.',
      },
      restrict_to_branch: {
        type: 'string',
        description: 'Comma-separated list of branches to automatically inspect. Leave blank to include all branches.',
      },
      push_events: {
        type: 'boolean',
        description: 'Trigger event for pushes to the repository.',
      },
      use_inherited_settings: {
        type: 'boolean',
        description: 'Indicates whether to inherit the default settings. Defaults to `false`.',
      },
    },
    required: ['id', 'token'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/integrations/pivotaltracker',
    body: ['token', 'restrict_to_branch', 'push_events', 'use_inherited_settings'],
  },
});
