import { defineTool } from '@usemcpkit/core';

export const reposListDeploymentStatuses = defineTool({
  name: 'repos:list_deployment_statuses',
  description: 'List deployment statuses. Users with pull access can view deployment statuses for a deployment:',
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
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['owner', 'repo', 'deployment_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/deployments/{deployment_id}/statuses',
    query: ['per_page', 'page'],
  },
});
