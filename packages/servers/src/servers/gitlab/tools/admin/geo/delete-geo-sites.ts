import { defineTool } from '@usemcpkit/core';

export const adminGeoDeleteGeoSites = defineTool({
  name: 'admin:geo:delete_geo_sites',
  description: 'Delete a Geo site. Deletes a specified Geo site.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the site',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/geo_sites/{id}',
  },
});
