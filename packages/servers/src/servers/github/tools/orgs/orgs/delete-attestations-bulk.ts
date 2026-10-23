import { defineTool } from '@usemcpkit/core';

export const orgsOrgsDeleteAttestationsBulk = defineTool({
  name: 'orgs:orgs:delete_attestations_bulk',
  description:
    'Delete attestations in bulk. Delete artifact attestations in bulk by either subject digests or unique ID.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      subject_digests: {
        type: 'array',
        description: 'List of subject digests associated with the artifact attestations to delete.',
        items: {
          type: 'string',
        },
      },
      attestation_ids: {
        type: 'array',
        description: 'List of unique IDs associated with the artifact attestations to delete.',
        items: {
          type: 'integer',
        },
      },
    },
    required: ['org'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/attestations/delete-request',
    body: ['subject_digests', 'attestation_ids'],
  },
});
