import { defineTool } from '@usemcpkit/core';

export const usersDeleteAttestationsBySubjectDigest = defineTool({
  name: 'users:delete_attestations_by_subject_digest',
  description: 'Delete attestations by subject digest. Delete an artifact attestation by subject digest.',
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
      subject_digest: {
        type: 'string',
        description: 'Subject Digest',
      },
    },
    required: ['username', 'subject_digest'],
  },
  request: {
    method: 'DELETE',
    path: '/users/{username}/attestations/digest/{subject_digest}',
  },
});
