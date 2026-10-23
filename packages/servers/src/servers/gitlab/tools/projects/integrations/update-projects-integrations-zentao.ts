import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsUpdateProjectsIntegrationsZentao = defineTool({
  name: 'projects:integrations:update_projects_integrations_zentao',
  description: 'Create or update the Zentao integration. Creates or updates the Zentao integration.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      url: {
        type: 'string',
        description: 'Base URL of the ZenTao instance.',
      },
      api_url: {
        type: 'string',
        description: 'If different from Web URL.',
      },
      api_token: {
        type: 'string',
      },
      zentao_product_xid: {
        type: 'string',
      },
      use_inherited_settings: {
        type: 'boolean',
        description: 'Indicates whether to inherit the default settings. Defaults to `false`.',
      },
    },
    required: ['id', 'url', 'api_token', 'zentao_product_xid'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/integrations/zentao',
    body: ['url', 'api_url', 'api_token', 'zentao_product_xid', 'use_inherited_settings'],
  },
});
