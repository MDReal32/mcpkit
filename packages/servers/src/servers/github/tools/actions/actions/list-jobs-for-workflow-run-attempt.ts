import { defineTool } from '@usemcpkit/core';

export const actionsActionsListJobsForWorkflowRunAttempt = defineTool({
  name: 'actions:actions:list_jobs_for_workflow_run_attempt',
  description:
    'List jobs for a workflow run attempt. Lists jobs for a specific workflow run attempt. You can use parameters to narrow the list of results. For more information about using parameters, see Parameters.',
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
      attempt_number: {
        type: 'integer',
        description: 'The attempt number of the workflow run.',
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
    required: ['owner', 'repo', 'run_id', 'attempt_number'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/jobs',
    query: ['per_page', 'page'],
  },
});
