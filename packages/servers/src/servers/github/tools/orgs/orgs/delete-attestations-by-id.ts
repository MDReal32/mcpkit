import { defineTool } from '@usemcpkit/core';

export const orgsOrgsDeleteAttestationsById = defineTool({
  name: 'orgs:orgs:delete_attestations_by_id',
  description:
    'Delete attestations by ID. Delete an artifact attestation by unique ID that is associated with a repository owned by an org.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      attestation_id: {
        type: 'integer',
        description: 'Attestation ID',
      },
    },
    required: ['org', 'attestation_id'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/attestations/{attestation_id}',
  },
});
