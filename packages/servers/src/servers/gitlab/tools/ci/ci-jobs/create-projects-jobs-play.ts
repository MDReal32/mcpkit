import { defineTool } from '@usemcpkit/core';

export const ciCiJobsCreateProjectsJobsPlay = defineTool({
  name: 'ci:ci_jobs:create_projects_jobs_play',
  description: 'Run a job. Runs a specified job. For a job in manual status, triggers an action to start the job.',
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
      job_variables_attributes: {
        type: 'array',
        description: 'User-defined variables to include when running the job.',
        items: {
          type: 'object',
          properties: {
            key: {
              type: 'string',
              description: 'Name of the variable.',
            },
            value: {
              type: 'string',
              description: 'Value of the variable.',
            },
          },
          required: ['key', 'value'],
        },
      },
      job_inputs: {
        type: 'object',
        description: 'Hash of job input values to use when playing the job. Introduced in GitLab 18.10.',
      },
    },
    required: ['job_id', 'id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/jobs/{job_id}/play',
    body: ['job_variables_attributes', 'job_inputs'],
  },
});
