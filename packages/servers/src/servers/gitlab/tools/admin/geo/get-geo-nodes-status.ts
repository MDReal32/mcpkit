import { defineTool } from '@usemcpkit/core';

export const adminGeoGetGeoNodesStatus = defineTool({
  name: 'admin:geo:get_geo_nodes_status',
  description: 'Retrieve metrics for a Geo node. Retrieves metrics for a specified Geo node.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the node',
      },
      refresh: {
        type: 'boolean',
        description: 'If `true`, fetches the latest status from the Geo node directly, ignoring the cache.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/geo_nodes/{id}/status',
    query: ['refresh'],
  },
});
