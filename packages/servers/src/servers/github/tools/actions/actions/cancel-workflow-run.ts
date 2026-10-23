import { defineTool } from '@usemcpkit/core';

export const actionsActionsCancelWorkflowRun = defineTool({
  name: 'actions:actions:cancel_workflow_run',
  description: 'Cancel a workflow run. Cancels a workflow run using its `id`.',
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
    method: 'POST',
    path: '/repos/{owner}/{repo}/actions/runs/{run_id}/cancel',
  },
});
