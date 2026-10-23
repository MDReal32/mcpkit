import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsUpdateGroupsIntegrationsTeamcity = defineTool({
  name: 'projects:integrations:update_groups_integrations_teamcity',
  description: 'Create or update the Teamcity integration. Creates or updates the Teamcity integration.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      enable_ssl_verification: {
        type: 'boolean',
        description: 'Enable SSL verification. Defaults to `true` (enabled).',
      },
      teamcity_url: {
        type: 'string',
        description: 'TeamCity root URL (for example, `https://teamcity.example.com`).',
      },
      build_type: {
        type: 'string',
        description: 'The build configuration ID of the TeamCity project.',
      },
      username: {
        type: 'string',
        description: 'A user with permissions to trigger a manual build.',
      },
      password: {
        type: 'string',
        description: 'The password of the user.',
      },
      push_events: {
        type: 'boolean',
        description: 'Trigger event for pushes to the repository.',
      },
      merge_requests_events: {
        type: 'boolean',
        description: 'Trigger event when a merge request is created, updated, or merged.',
      },
      use_inherited_settings: {
        type: 'boolean',
        description: 'Indicates whether to inherit the default settings. Defaults to `false`.',
      },
    },
    required: ['id', 'teamcity_url', 'build_type', 'username', 'password'],
  },
  request: {
    method: 'PUT',
    path: '/groups/{id}/integrations/teamcity',
    body: [
      'enable_ssl_verification',
      'teamcity_url',
      'build_type',
      'username',
      'password',
      'push_events',
      'merge_requests_events',
      'use_inherited_settings',
    ],
  },
});
