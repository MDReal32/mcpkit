import { defineTool } from '@usemcpkit/core';

export const ciCiJobsCreateProjectsJobsRetry = defineTool({
  name: 'ci:ci_jobs:create_projects_jobs_retry',
  description: 'Retry a job. Retries a specified job in a project.',
  input: {
    type: 'object',
    properties: {
      job_id: {
        type: 'integer',
        description: 'ID of the job.',
      },
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      inputs: {
        type: 'object',
        description: 'Input values for the job.',
      },
    },
    required: ['job_id', 'id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/jobs/{job_id}/retry',
    body: ['inputs'],
  },
});
