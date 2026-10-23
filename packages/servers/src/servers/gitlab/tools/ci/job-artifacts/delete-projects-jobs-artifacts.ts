import { defineTool } from '@usemcpkit/core';

export const ciJobArtifactsDeleteProjectsJobsArtifacts = defineTool({
  name: 'ci:job_artifacts:delete_projects_jobs_artifacts',
  description: 'Delete job artifacts. Deletes job artifacts from a specified job in a project.',
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
    },
    required: ['id', 'job_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/jobs/{job_id}/artifacts',
  },
});
