import { defineTool } from '@usemcpkit/core';

export const collaborationDashboardsGetAllGadgets = defineTool({
  name: 'collaboration:dashboards:get_all_gadgets',
  description: 'Get gadgets. Returns a list of dashboard gadgets on a dashboard.',
  input: {
    type: 'object',
    properties: {
      dashboardId: {
        type: 'integer',
        description: 'The ID of the dashboard.',
      },
      moduleKey: {
        type: 'string',
        description:
          'The list of gadgets module keys. To include multiple module keys, separate module keys with ampersand: `moduleKey=key:one&moduleKey=key:two`. (comma-separated)',
      },
      uri: {
        type: 'string',
        description:
          'The list of gadgets URIs. To include multiple URIs, separate URIs with ampersand: `uri=/rest/example/uri/1&uri=/rest/example/uri/2`. (comma-separated)',
      },
      gadgetId: {
        type: 'string',
        description:
          'The list of gadgets IDs. To include multiple IDs, separate IDs with ampersand: `gadgetId=10000&gadgetId=10001`. (comma-separated)',
      },
    },
    required: ['dashboardId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/dashboard/{dashboardId}/gadget',
    query: ['moduleKey', 'uri', 'gadgetId'],
  },
});
