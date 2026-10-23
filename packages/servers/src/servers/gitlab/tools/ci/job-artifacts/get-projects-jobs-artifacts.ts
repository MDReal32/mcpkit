import { defineTool } from '@usemcpkit/core';

export const ciJobArtifactsGetProjectsJobsArtifacts = defineTool({
  name: 'ci:job_artifacts:get_projects_jobs_artifacts',
  description:
    'Download an artifact from a job. This feature was introduced in GitLab 8.5. The `file_type` attribute was added in GitLab 19.4.',
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
      file_type: {
        type: 'string',
        default: 'archive',
        enum: [
          'accessibility',
          'api_fuzzing',
          'archive',
          'cobertura',
          'jacoco',
          'codequality',
          'container_scanning',
          'dast',
          'dependency_scanning',
          'dotenv',
          'junit',
          'license_scanning',
          'lsif',
          'metrics',
          'performance',
          'browser_performance',
          'load_performance',
          'sast',
          'secret_detection',
          'requirements',
          'requirements_v2',
          'cluster_image_scanning',
          'cyclonedx',
          'sarif',
        ],
        description:
          'Type of artifact to download. Set a specific report type to download that report file directly instead of the full artifacts archive. `performance` and `browser_performance` share a report group. If the job uploaded both, the requested type is returned, and if it uploaded only one, that artifact is returned whichever type was requested. Introduced in GitLab 19.4.',
      },
      job_token: {
        type: 'string',
        description: 'CI/CD job token for multi-project pipelines. Premium and Ultimate only.',
      },
      download_mode: {
        type: 'string',
        enum: ['proxy', 'direct'],
        description:
          'Requested download transfer mode (`proxy` or `direct`). Only honored when allowed by the object storage configuration.',
      },
    },
    required: ['id', 'job_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/jobs/{job_id}/artifacts',
    query: ['file_type', 'job_token', 'download_mode'],
  },
});
