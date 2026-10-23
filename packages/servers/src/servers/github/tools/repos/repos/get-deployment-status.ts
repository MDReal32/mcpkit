import { defineTool } from '@usemcpkit/core';

export const reposReposGetDeploymentStatus = defineTool({
  name: 'repos:repos:get_deployment_status',
  description: 'Get a deployment status. Users with pull access can view a deployment status for a deployment:',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      deployment_id: {
        type: 'integer',
        description: 'deployment_id parameter',
      },
      status_id: {
        type: 'integer',
      },
    },
    required: ['owner', 'repo', 'deployment_id', 'status_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}',
  },
});
