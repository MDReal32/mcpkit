import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetJobForWorkflowRun = defineTool({
  name: 'actions:actions:get_job_for_workflow_run',
  description: 'Get a job for a workflow run. Gets a specific job in a workflow run.',
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
      job_id: {
        type: 'integer',
        description: 'The unique identifier of the job.',
      },
    },
    required: ['owner', 'repo', 'job_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/jobs/{job_id}',
  },
});
