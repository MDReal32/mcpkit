import { defineTool } from '@usemcpkit/core';

export const reposCreateAttestation = defineTool({
  name: 'repos:create_attestation',
  description: 'Create an attestation. Store an artifact attestation and associate it with a repository.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      bundle: {
        type: 'object',
        description:
          "The attestation's Sigstore Bundle. Refer to the Sigstore Bundle Specification for more information.",
        properties: {
          mediaType: {
            type: 'string',
          },
          verificationMaterial: {
            type: 'object',
          },
          dsseEnvelope: {
            type: 'object',
          },
        },
      },
    },
    required: ['owner', 'repo', 'bundle'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/attestations',
    body: ['bundle'],
  },
});
