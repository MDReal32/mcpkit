import { defineTool } from '@usemcpkit/core';

export const reposCancelPagesDeployment = defineTool({
  name: 'repos:cancel_pages_deployment',
  description: 'Cancel a GitHub Pages deployment. Cancels a GitHub Pages deployment.',
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
      pages_deployment_id: {
        description: 'The ID of the Pages deployment. You can also give the commit SHA of the deployment.',
      },
    },
    required: ['owner', 'repo', 'pages_deployment_id'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}/cancel',
  },
});
