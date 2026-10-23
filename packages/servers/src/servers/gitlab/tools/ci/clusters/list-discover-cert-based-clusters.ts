import { defineTool } from '@usemcpkit/core';

export const ciClustersListDiscoverCertBasedClusters = defineTool({
  name: 'ci:clusters:list_discover_cert_based_clusters',
  description:
    'List all certificate-based clusters. Lists all certificate-based clusters associated with a project. This feature was introduced in GitLab 17.9.',
  input: {
    type: 'object',
    properties: {
      group_id: {
        type: 'integer',
        description: 'ID of the group to find all certificate-based clusters in the hierarchy.',
      },
    },
    required: ['group_id'],
  },
  request: {
    method: 'GET',
    path: '/discover-cert-based-clusters',
    query: ['group_id'],
  },
});
