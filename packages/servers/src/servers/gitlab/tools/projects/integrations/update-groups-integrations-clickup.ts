import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsUpdateGroupsIntegrationsClickup = defineTool({
  name: 'projects:integrations:update_groups_integrations_clickup',
  description: 'Create or update the Clickup integration. Creates or updates the Clickup integration.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      project_url: {
        type: 'string',
        description: 'URL of the project.',
      },
      issues_url: {
        type: 'string',
        description: 'URL of the issue.',
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
    required: ['id', 'project_url', 'issues_url'],
  },
  request: {
    method: 'PUT',
    path: '/groups/{id}/integrations/clickup',
    body: ['project_url', 'issues_url', 'push_events', 'use_inherited_settings'],
  },
});
