import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsUpdateProjectsServicesExternalWiki = defineTool({
  name: 'projects:integrations:update_projects_services_external_wiki',
  description: 'Create or update the External Wiki integration. Creates or updates the External Wiki integration.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      external_wiki_url: {
        type: 'string',
        description: 'URL of the external wiki.',
      },
      use_inherited_settings: {
        type: 'boolean',
        description: 'Indicates whether to inherit the default settings. Defaults to `false`.',
      },
    },
    required: ['id', 'external_wiki_url'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/services/external-wiki',
    body: ['external_wiki_url', 'use_inherited_settings'],
  },
});
