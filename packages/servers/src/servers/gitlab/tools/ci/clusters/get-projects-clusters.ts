import { defineTool } from '@usemcpkit/core';

export const ciClustersGetProjectsClusters = defineTool({
  name: 'ci:clusters:get_projects_clusters',
  description: 'Retrieve a cluster from a project. Retrieves a specified cluster in a project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      cluster_id: {
        type: 'integer',
        description: 'ID of the cluster.',
      },
    },
    required: ['id', 'cluster_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/clusters/{cluster_id}',
  },
});
