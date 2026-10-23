import { defineTool } from '@usemcpkit/core';

export const orgsCreateArtifactStorageRecord = defineTool({
  name: 'orgs:create_artifact_storage_record',
  description:
    'Create artifact metadata storage record. Create metadata storage records for artifacts associated with an organization. This endpoint will create a new artifact storage record on behalf of any artifact matching the provided digest and associated with a repository owned by the organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      name: {
        type: 'string',
        description: 'The name of the artifact.',
      },
      digest: {
        type: 'string',
        description: 'The digest of the artifact (algorithm:hex-encoded-digest).',
      },
      version: {
        type: 'string',
        description: 'The artifact version.',
      },
      artifact_url: {
        type: 'string',
        description: 'The URL where the artifact is stored.',
      },
      path: {
        type: 'string',
        description: 'The path of the artifact.',
      },
      registry_url: {
        type: 'string',
        description: 'The base URL of the artifact registry.',
      },
      repository: {
        type: 'string',
        description: 'The repository name within the registry.',
      },
      status: {
        type: 'string',
        description: 'The status of the artifact (e.g., active, inactive).',
        default: 'active',
        enum: ['active', 'eol', 'deleted'],
      },
      github_repository: {
        type: 'string',
        description:
          'The name of the GitHub repository associated with the artifact. This should be used when there are no provenance attestations available for the artifact. The repository must belong to the organization specified in the path parameter.',
      },
      return_records: {
        type: 'boolean',
        description: 'If true, the endpoint will return the created record in the response body.',
        default: true,
      },
    },
    required: ['org', 'name', 'digest', 'registry_url'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/artifacts/metadata/storage-record',
    body: [
      'name',
      'digest',
      'version',
      'artifact_url',
      'path',
      'registry_url',
      'repository',
      'status',
      'github_repository',
      'return_records',
    ],
  },
});
