import { defineTool } from '@usemcpkit/core';

export const orgsListArtifactStorageRecords = defineTool({
  name: 'orgs:list_artifact_storage_records',
  description:
    'List artifact storage records. List artifact storage records with a given subject digest for repositories owned by an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      subject_digest: {
        type: 'string',
        description:
          "The parameter should be set to the attestation's subject's SHA256 digest, in the form `sha256:HEX_DIGEST`.",
      },
    },
    required: ['org', 'subject_digest'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/artifacts/{subject_digest}/metadata/storage-records',
  },
});
