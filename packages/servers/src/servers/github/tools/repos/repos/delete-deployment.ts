import { defineTool } from '@usemcpkit/core';

export const reposReposDeleteDeployment = defineTool({
  name: 'repos:repos:delete_deployment',
  description:
    'Delete a deployment. If the repository only has one deployment, you can delete the deployment regardless of its status. If the repository has more than one deployment, you can only delete inactive deployments. This ensures that repositories with multiple deployments will always have an active deployment.',
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
    },
    required: ['owner', 'repo', 'deployment_id'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/deployments/{deployment_id}',
  },
});
