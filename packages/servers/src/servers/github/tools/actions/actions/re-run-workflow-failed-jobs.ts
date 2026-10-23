import { defineTool } from '@usemcpkit/core';

export const actionsActionsReRunWorkflowFailedJobs = defineTool({
  name: 'actions:actions:re_run_workflow_failed_jobs',
  description:
    'Re-run failed jobs from a workflow run. Re-run all of the failed jobs and their dependent jobs in a workflow run using the `id` of the workflow run.',
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
      enable_debug_logging: {
        type: 'boolean',
        description: 'Whether to enable debug logging for the re-run.',
        default: false,
      },
    },
    required: ['owner', 'repo', 'run_id'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/actions/runs/{run_id}/rerun-failed-jobs',
    body: ['enable_debug_logging'],
  },
});
