import { defineTool } from '@usemcpkit/core';

export const collaborationDashboardsGetDashboard = defineTool({
  name: 'collaboration:dashboards:get_dashboard',
  description: 'Get dashboard. Returns a dashboard.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the dashboard.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/dashboard/{id}',
  },
});
