import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsUpdateGroupsIntegrationsPackagist = defineTool({
  name: 'projects:integrations:update_groups_integrations_packagist',
  description: 'Create or update the Packagist integration. Creates or updates the Packagist integration.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      username: {
        type: 'string',
        description: 'Username of a Packagist account.',
      },
      token: {
        type: 'string',
        description: 'API token of the Packagist server.',
      },
      server: {
        type: 'string',
        description: 'URL of the Packagist server. The default value is `https://packagist.org`.',
      },
      push_events: {
        type: 'boolean',
        description: 'Trigger event for pushes to the repository.',
      },
      merge_requests_events: {
        type: 'boolean',
        description: 'Trigger event when a merge request is created, updated, or merged.',
      },
      tag_push_events: {
        type: 'boolean',
        description: 'Trigger event for new tags pushed to the repository.',
      },
      use_inherited_settings: {
        type: 'boolean',
        description: 'Indicates whether to inherit the default settings. Defaults to `false`.',
      },
    },
    required: ['id', 'username', 'token'],
  },
  request: {
    method: 'PUT',
    path: '/groups/{id}/integrations/packagist',
    body: [
      'username',
      'token',
      'server',
      'push_events',
      'merge_requests_events',
      'tag_push_events',
      'use_inherited_settings',
    ],
  },
});
