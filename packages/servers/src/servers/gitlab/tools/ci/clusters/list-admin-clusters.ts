import { defineTool } from '@usemcpkit/core';

export const ciClustersListAdminClusters = defineTool({
  name: 'ci:clusters:list_admin_clusters',
  description: 'List all instance clusters. Lists all instance clusters for the instance.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/admin/clusters',
  },
});
