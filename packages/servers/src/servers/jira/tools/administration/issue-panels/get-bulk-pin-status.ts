import { defineTool } from '@usemcpkit/core';

export const administrationIssuePanelsGetBulkPinStatus = defineTool({
  name: 'administration:issue_panels:get_bulk_pin_status',
  description:
    'Get issue panel pin status for projects. Get the pin status of an issue panel (added by a Forge app) for multiple projects.',
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
        description: 'The IDs or keys of the projects to check the issue panel pin status for.',
        items: {
          type: 'string',
          description: 'The IDs or keys of the projects to check the issue panel pin status for.',
        },
      },
    },
    required: ['moduleId', 'projectList'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/forge/panel/action/bulk/status',
    body: ['moduleId', 'projectList'],
  },
});
