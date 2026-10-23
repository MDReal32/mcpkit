import { defineTool } from '@usemcpkit/core';

export const ciJobsGetJobsArtifacts = defineTool({
  name: 'ci:jobs:get_jobs_artifacts',
  description: 'Download job artifacts. Downloads artifacts for a specified job.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the job.',
      },
      token: {
        type: 'string',
        description: 'Authentication token of the job.',
      },
      direct_download: {
        type: 'boolean',
        default: false,
        description: 'If `true`, performs a direct download of artifacts from remote storage instead of proxying them.',
      },
      download_mode: {
        type: 'string',
        enum: ['proxy', 'direct'],
        description:
          'Requested download transfer mode (`proxy` or `direct`). Only honored when allowed by the object storage configuration.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/jobs/{id}/artifacts',
    query: ['token', 'direct_download', 'download_mode'],
  },
});
