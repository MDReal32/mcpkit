import { defineTool } from '@usemcpkit/core';

export const projectsAttestationsListProjectsAttestations = defineTool({
  name: 'projects:attestations:list_projects_attestations',
  description:
    'List all attestations for a project. Lists all attestations for a specified project and artifact hash. This feature was introduced in GitLab 18.7.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      subject_digest: {
        type: 'string',
        description: 'Hex-encoded SHA-256 hash of the artifact.',
      },
    },
    required: ['id', 'subject_digest'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/attestations/{subject_digest}',
  },
});
