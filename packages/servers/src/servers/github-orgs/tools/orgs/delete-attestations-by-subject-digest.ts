import { defineTool } from '@usemcpkit/core';

export const orgsDeleteAttestationsBySubjectDigest = defineTool({
  name: 'orgs:delete_attestations_by_subject_digest',
  description: 'Delete attestations by subject digest. Delete an artifact attestation by subject digest.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      subject_digest: {
        type: 'string',
        description: 'Subject Digest',
      },
    },
    required: ['org', 'subject_digest'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/attestations/digest/{subject_digest}',
  },
});
