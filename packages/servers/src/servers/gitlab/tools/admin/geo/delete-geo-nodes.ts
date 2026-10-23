import { defineTool } from '@usemcpkit/core';

export const adminGeoDeleteGeoNodes = defineTool({
  name: 'admin:geo:delete_geo_nodes',
  description: 'Delete a Geo node. Deletes a specified Geo node.',
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
    method: 'DELETE',
    path: '/geo_nodes/{id}',
  },
});
