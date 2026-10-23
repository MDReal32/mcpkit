import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsUpdateProjectsServicesPushover = defineTool({
  name: 'projects:integrations:update_projects_services_pushover',
  description: 'Create or update the Pushover integration. Creates or updates the Pushover integration.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      api_key: {
        type: 'string',
        description: 'The application key.',
      },
      user_key: {
        type: 'string',
        description: 'The user key.',
      },
      device: {
        type: 'string',
        description: 'Leave blank for all active devices.',
      },
      priority: {
        type: 'string',
        description: 'The priority.',
      },
      sound: {
        type: 'string',
        description: 'The sound of the notification.',
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
    required: ['id', 'api_key', 'user_key', 'priority'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/services/pushover',
    body: ['api_key', 'user_key', 'device', 'priority', 'sound', 'push_events', 'use_inherited_settings'],
  },
});
