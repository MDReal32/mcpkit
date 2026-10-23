import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsUpdateProjectsServicesBamboo = defineTool({
  name: 'projects:integrations:update_projects_services_bamboo',
  description: 'Create or update the Bamboo integration. Creates or updates the Bamboo integration.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      enable_ssl_verification: {
        type: 'boolean',
        description: 'Enable SSL verification. Defaults to `true` (enabled).',
      },
      bamboo_url: {
        type: 'string',
        description: 'Bamboo root URL (for example, `https://bamboo.example.com`).',
      },
      build_key: {
        type: 'string',
        description: 'Bamboo build plan key (for example, `KEY`).',
      },
      username: {
        type: 'string',
        description: 'User with API access to the Bamboo server.',
      },
      password: {
        type: 'string',
        description: 'Password of the user.',
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
    required: ['id', 'bamboo_url', 'build_key', 'username', 'password'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/services/bamboo',
    body: [
      'enable_ssl_verification',
      'bamboo_url',
      'build_key',
      'username',
      'password',
      'push_events',
      'use_inherited_settings',
    ],
  },
});
