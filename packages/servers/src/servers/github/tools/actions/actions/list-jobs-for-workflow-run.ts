import { defineTool } from '@usemcpkit/core';

export const actionsActionsListJobsForWorkflowRun = defineTool({
  name: 'actions:actions:list_jobs_for_workflow_run',
  description:
    'List jobs for a workflow run. Lists jobs for a workflow run. You can use parameters to narrow the list of results. For more information about using parameters, see Parameters.',
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
      filter: {
        type: 'string',
        default: 'latest',
        enum: ['latest', 'all'],
        description:
          'Filters jobs by their `completed_at` timestamp. `latest` returns jobs from the most recent execution of the workflow run. `all` returns all jobs for a workflow run, including from old executions of the workflow run.',
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
    required: ['owner', 'repo', 'run_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/runs/{run_id}/jobs',
    query: ['filter', 'per_page', 'page'],
  },
});
