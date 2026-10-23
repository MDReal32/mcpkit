import { defineTool } from '@usemcpkit/core';

export const actionsGetConcurrencyGroupForRepository = defineTool({
  name: 'actions:get_concurrency_group_for_repository',
  description:
    "Get a concurrency group for a repository. Gets a specific concurrency group for a repository, including all instances in the group's queue. Returns 404 if the group is inactive or does not exist.",
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
      concurrency_group_name: {
        type: 'string',
        description: 'The name of the concurrency group.',
      },
      ahead_of_run: {
        type: 'integer',
        description:
          'Filter to items ahead of this workflow run ID in the queue, plus the run itself. Matches workflow-level concurrency and reusable-workflow leases held on behalf of the run. Mutually exclusive with `ahead_of_job`.',
      },
      ahead_of_job: {
        type: 'integer',
        description:
          "Filter to items ahead of this job ID in the queue, plus the job itself. Matches job-level concurrency and reusable-workflow leases on the job's ancestor paths. Mutually exclusive with `ahead_of_run`.",
      },
    },
    required: ['owner', 'repo', 'concurrency_group_name'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/concurrency_groups/{concurrency_group_name}',
    query: ['ahead_of_run', 'ahead_of_job'],
  },
});
