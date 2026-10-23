import { defineTool } from '@usemcpkit/core';

export const ciJobArtifactsListProjectsJobsArtifactsTree = defineTool({
  name: 'ci:job_artifacts:list_projects_jobs_artifacts_tree',
  description:
    'List all files in an artifacts archive. Lists all files in a specified artifacts archive without extracting them.',
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
      path: {
        type: 'string',
        default: '',
        description: 'Path to browse in the artifacts archive. Defaults to the root directory.',
      },
      recursive: {
        type: 'boolean',
        default: false,
        description: 'If `true`, returns all entries recursively.',
      },
      job_token: {
        type: 'string',
        description: 'CI/CD job token for multi-project pipelines. Premium and Ultimate only.',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
    required: ['id', 'job_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/jobs/{job_id}/artifacts/tree',
    query: ['path', 'recursive', 'job_token', 'page', 'per_page'],
  },
});
