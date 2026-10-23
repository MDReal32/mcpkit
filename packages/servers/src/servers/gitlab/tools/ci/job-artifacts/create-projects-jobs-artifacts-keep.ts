import { defineTool } from '@usemcpkit/core';

export const ciJobArtifactsCreateProjectsJobsArtifactsKeep = defineTool({
  name: 'ci:job_artifacts:create_projects_jobs_artifacts_keep',
  description:
    'Retain job artifacts. Retains job artifacts. Prevents artifacts for a job from being automatically deleted when they reach their expiration date.',
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
    method: 'POST',
    path: '/projects/{id}/jobs/{job_id}/artifacts/keep',
  },
});
