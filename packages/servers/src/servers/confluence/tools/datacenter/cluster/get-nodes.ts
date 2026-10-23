import { defineTool } from '@usemcpkit/core';

export const datacenterClusterGetNodes = defineTool({
  name: 'datacenter:cluster:get_nodes',
  description:
    '[Data Center] Get node statuses in a cluster. Returns a paginated list of information about each node in a cluster. Example request URI(s): - `https://example.com/confluence/rest/api/cluster/nodes` - `https://example.com/confluence/rest/api/cluster/nodes?start=0&limit=10`',
  input: {
    type: 'object',
    properties: {
      limit: {
        type: 'integer',
        description:
          'The limit of the number of node statuses to return, this may be restricted by fixed system limit.',
      },
      start: {
        type: 'integer',
        description: 'The start point of the collection to return.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/cluster/nodes',
    query: ['limit', 'start'],
  },
});
