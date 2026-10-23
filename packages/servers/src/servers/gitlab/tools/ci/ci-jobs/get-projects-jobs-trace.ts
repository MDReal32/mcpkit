import { defineTool } from '@usemcpkit/core';

export const ciCiJobsGetProjectsJobsTrace = defineTool({
  name: 'ci:ci_jobs:get_projects_jobs_trace',
  description: 'Get a trace of a specific job of a project. Retrieves a log file for a job.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      job_id: {
        type: 'integer',
        description: 'ID of the job.',
      },
      byte_offset: {
        type: 'integer',
        description: 'Byte offset to start reading the trace from.',
      },
      byte_limit: {
        type: 'integer',
        description: 'Maximum number of bytes to return.',
      },
    },
    required: ['id', 'job_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/jobs/{job_id}/trace',
    query: ['byte_offset', 'byte_limit'],
  },
});
