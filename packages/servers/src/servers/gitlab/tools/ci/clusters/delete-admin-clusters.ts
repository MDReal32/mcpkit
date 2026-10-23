import { defineTool } from '@usemcpkit/core';

export const ciClustersDeleteAdminClusters = defineTool({
  name: 'ci:clusters:delete_admin_clusters',
  description:
    'Delete instance cluster. Deletes an existing instance cluster. Does not remove existing resources in the connected Kubernetes cluster.',
  input: {
    type: 'object',
    properties: {
      cluster_id: {
        type: 'integer',
        description: 'ID of the cluster.',
      },
    },
    required: ['cluster_id'],
  },
  request: {
    method: 'DELETE',
    path: '/admin/clusters/{cluster_id}',
  },
});
