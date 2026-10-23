import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsUpdateProjectsServicesMattermostSlashCommands = defineTool({
  name: 'projects:integrations:update_projects_services_mattermost_slash_commands',
  description:
    'Create or update the Mattermost Slash Commands integration. Creates or updates the Mattermost Slash Commands integration.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      token: {
        type: 'string',
        description: 'The Mattermost token.',
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
    path: '/projects/{id}/services/mattermost-slash-commands',
    body: ['token', 'use_inherited_settings'],
  },
});
