import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetPendingDeploymentsForRun = defineTool({
  name: 'actions:actions:get_pending_deployments_for_run',
  description:
    'Get pending deployments for a workflow run. Get all deployment environments for a workflow run that are waiting for protection rules to pass.',
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
      run_id: {
        type: 'integer',
        description: 'The unique identifier of the workflow run.',
      },
    },
    required: ['owner', 'repo', 'run_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments',
  },
});
