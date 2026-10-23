import { defineTool } from '@usemcpkit/core';

export const adminGeoListGeoNodesStatus = defineTool({
  name: 'admin:geo:list_geo_nodes_status',
  description: 'List all Geo node statuses. Lists all Geo node statuses.',
  input: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/geo_nodes/status',
    query: ['page', 'per_page'],
  },
});
