import { defineTool } from '@usemcpkit/core';

export const adminGeoGetGeoNodes = defineTool({
  name: 'admin:geo:get_geo_nodes',
  description: 'Retrieve a single Geo node. Retrieves a single Geo Node.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the node',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/geo_nodes/{id}',
  },
});
