import { defineTool } from '@usemcpkit/core';

export const actionsGetWorkflowRunAttempt = defineTool({
  name: 'actions:get_workflow_run_attempt',
  description: 'Get a workflow run attempt. Gets a specific workflow run attempt.',
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
      exclude_pull_requests: {
        type: 'boolean',
        default: false,
        description: 'If `true` pull requests are omitted from the response (empty array).',
      },
    },
    required: ['owner', 'repo', 'run_id', 'attempt_number'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}',
    query: ['exclude_pull_requests'],
  },
});
