import { defineTool } from '@usemcpkit/core';

export const administrationIssuePanelsBulkPinUnpinProjectsAsync = defineTool({
  name: 'administration:issue_panels:bulk_pin_unpin_projects_async',
  description:
    'Bulk pin or unpin issue panel to projects. Bulk pin or unpin an issue panel (added by a Forge app) to or from multiple projects.',
  input: {
    type: 'object',
    properties: {
      moduleId: {
        type: 'string',
        description:
          'The moduleId of the Forge panel in the format `ari:cloud:ecosystem::extension/{app-id}/{environment-id}/static/{module-key}`',
      },
      projectList: {
        type: 'array',
        description: 'The list of projects to pin or unpin the issue panel to or from.',
        items: {
          type: 'object',
          description: 'The list of projects to pin or unpin the issue panel to or from.',
          properties: {
            action: {
              type: 'string',
              description: 'The action to perform: PIN or UNPIN.',
              enum: ['PIN', 'UNPIN'],
            },
            projectIdOrKey: {
              type: 'string',
              description: 'The project ID or key.',
            },
          },
          required: ['action', 'projectIdOrKey'],
        },
      },
    },
    required: ['moduleId', 'projectList'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/forge/panel/action/bulk/async',
    body: ['moduleId', 'projectList'],
  },
});
