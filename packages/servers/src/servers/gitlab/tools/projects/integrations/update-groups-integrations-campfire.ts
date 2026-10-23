import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsUpdateGroupsIntegrationsCampfire = defineTool({
  name: 'projects:integrations:update_groups_integrations_campfire',
  description: 'Create or update the Campfire integration. Creates or updates the Campfire integration.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      token: {
        type: 'string',
        description:
          'API authentication token from Campfire. To get the token, sign in to Campfire and select **My info**.',
      },
      subdomain: {
        type: 'string',
        description: "`.campfirenow.com` subdomain when you're signed in.",
      },
      room: {
        type: 'string',
        description: 'ID portion of the Campfire room URL.',
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
    path: '/groups/{id}/integrations/campfire',
    body: ['token', 'subdomain', 'room', 'push_events', 'use_inherited_settings'],
  },
});
