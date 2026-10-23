import { defineTool } from '@usemcpkit/core';

export const actionsActionsApproveWorkflowRun = defineTool({
  name: 'actions:actions:approve_workflow_run',
  description:
    'Approve a workflow run for a fork pull request. Approves a workflow run for a pull request from a public fork of a first time contributor. For more information, see "Approving workflow runs from public forks."',
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
    path: '/repos/{owner}/{repo}/actions/runs/{run_id}/approve',
  },
});
