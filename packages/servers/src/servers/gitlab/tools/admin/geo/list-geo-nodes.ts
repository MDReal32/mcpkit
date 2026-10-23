import { defineTool } from '@usemcpkit/core';

export const adminGeoListGeoNodes = defineTool({
  name: 'admin:geo:list_geo_nodes',
  description: 'List all Geo nodes. Lists all Geo nodes for the instance.',
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
    path: '/geo_nodes',
    query: ['page', 'per_page'],
  },
});
