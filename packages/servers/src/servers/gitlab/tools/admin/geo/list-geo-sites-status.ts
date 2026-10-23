import { defineTool } from '@usemcpkit/core';

export const adminGeoListGeoSitesStatus = defineTool({
  name: 'admin:geo:list_geo_sites_status',
  description: 'List all Geo site statuses. Lists all Geo site statuses.',
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
    path: '/geo_sites/status',
    query: ['page', 'per_page'],
  },
});
