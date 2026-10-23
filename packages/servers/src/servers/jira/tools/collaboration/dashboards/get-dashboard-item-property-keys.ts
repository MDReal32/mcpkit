import { defineTool } from '@usemcpkit/core';

export const collaborationDashboardsGetDashboardItemPropertyKeys = defineTool({
  name: 'collaboration:dashboards:get_dashboard_item_property_keys',
  description: 'Get dashboard item property keys. Returns the keys of all properties for a dashboard item.',
  input: {
    type: 'object',
    properties: {
      dashboardId: {
        type: 'string',
        description: 'The ID of the dashboard.',
      },
      itemId: {
        type: 'string',
        description: 'The ID of the dashboard item.',
      },
    },
    required: ['dashboardId', 'itemId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/dashboard/{dashboardId}/items/{itemId}/properties',
  },
});
