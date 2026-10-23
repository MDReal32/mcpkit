import { defineTool } from '@usemcpkit/core';

export const actionsForceCancelWorkflowRun = defineTool({
  name: 'actions:force_cancel_workflow_run',
  description:
    'Force cancel a workflow run. Cancels a workflow run and bypasses conditions that would otherwise cause a workflow execution to continue, such as an `always()` condition on a job. You should only use this endpoint to cancel a workflow run when the workflow run is not responding to `POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel`.',
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
    path: '/repos/{owner}/{repo}/actions/runs/{run_id}/force-cancel',
  },
});
