import { defineTool } from '@usemcpkit/core';

export const usersUsersDeleteAttestationsBulk = defineTool({
  name: 'users:users:delete_attestations_bulk',
  description:
    'Delete attestations in bulk. Delete artifact attestations in bulk by either subject digests or unique ID.',
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
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
    required: ['username'],
  },
  request: {
    method: 'POST',
    path: '/users/{username}/attestations/delete-request',
    body: ['subject_digests', 'attestation_ids'],
  },
});
