import { defineTool } from '@usemcpkit/core';

export const ciClustersListGroupsClusters = defineTool({
  name: 'ci:clusters:list_groups_clusters',
  description: 'List all group clusters. Lists all group clusters for a specified group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
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
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/clusters',
    query: ['page', 'per_page'],
  },
});
