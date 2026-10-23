import { defineTool } from '@usemcpkit/core';

export const adminGeoListGeoSites = defineTool({
  name: 'admin:geo:list_geo_sites',
  description: 'List all Geo sites. Lists all Geo sites for the instance.',
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
    path: '/geo_sites',
    query: ['page', 'per_page'],
  },
});
