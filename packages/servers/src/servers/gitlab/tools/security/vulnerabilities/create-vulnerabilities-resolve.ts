import { defineTool } from '@usemcpkit/core';

export const securityVulnerabilitiesCreateVulnerabilitiesResolve = defineTool({
  name: 'security:vulnerabilities:create_vulnerabilities_resolve',
  description:
    'Resolve a vulnerability. Resolves a specified vulnerability. Returns status code `304` if the vulnerability is already resolved. Returns status code `403` if the authenticated user does not have permission to change the vulnerability status.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID of the vulnerability.',
      },
      comment: {
        type: 'string',
        description: 'Comment why vulnerability was reverted to detected (maximum 50,000 characters).',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/vulnerabilities/{id}/resolve',
    body: ['comment'],
  },
});
