import { defineTool } from '@usemcpkit/core';

export const ciClustersDeleteGroupsClusters = defineTool({
  name: 'ci:clusters:delete_groups_clusters',
  description:
    'Delete a group cluster. Deletes a specified group cluster. Does not remove existing resources in the connected Kubernetes cluster.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      cluster_id: {
        type: 'integer',
        description: 'ID of the cluster.',
      },
    },
    required: ['id', 'cluster_id'],
  },
  request: {
    method: 'DELETE',
    path: '/groups/{id}/clusters/{cluster_id}',
  },
});
