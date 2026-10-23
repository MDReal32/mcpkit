import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsUpdateProjectsServicesConfluence = defineTool({
  name: 'projects:integrations:update_projects_services_confluence',
  description: 'Create or update the Confluence integration. Creates or updates the Confluence integration.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      confluence_url: {
        type: 'string',
        description: 'URL of the Confluence Workspace hosted on `atlassian.net`.',
      },
      use_inherited_settings: {
        type: 'boolean',
        description: 'Indicates whether to inherit the default settings. Defaults to `false`.',
      },
    },
    required: ['id', 'confluence_url'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/services/confluence',
    body: ['confluence_url', 'use_inherited_settings'],
  },
});
