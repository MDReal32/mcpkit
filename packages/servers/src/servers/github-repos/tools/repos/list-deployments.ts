import { defineTool } from '@usemcpkit/core';

export const reposListDeployments = defineTool({
  name: 'repos:list_deployments',
  description: 'List deployments. Simple filtering of deployments is available via query parameters:',
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
      sha: {
        type: 'string',
        default: 'none',
        description: 'The SHA recorded at creation time.',
      },
      ref: {
        type: 'string',
        default: 'none',
        description: 'The name of the ref. This can be a branch, tag, or SHA.',
      },
      task: {
        type: 'string',
        default: 'none',
        description: 'The name of the task for the deployment (e.g., `deploy` or `deploy:migrations`).',
      },
      environment: {
        type: 'string',
        default: 'none',
        description: 'The name of the environment that was deployed to (e.g., `staging` or `production`).',
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
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/deployments',
    query: ['sha', 'ref', 'task', 'environment', 'per_page', 'page'],
  },
});
