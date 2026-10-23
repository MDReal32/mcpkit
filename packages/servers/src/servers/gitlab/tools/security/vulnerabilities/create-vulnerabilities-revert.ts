import { defineTool } from '@usemcpkit/core';

export const securityVulnerabilitiesCreateVulnerabilitiesRevert = defineTool({
  name: 'security:vulnerabilities:create_vulnerabilities_revert',
  description:
    'Revert a vulnerability to detected state. Reverts a specified vulnerability to detected state. Returns status code `304` if the vulnerability is already in detected state. Returns status code `403` if the authenticated user does not have permission to change vulnerability status.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID of the vulnerability.',
      },
      comment: {
        type: 'string',
        description: 'Comment related to the vulnerability.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/vulnerabilities/{id}/revert',
    body: ['comment'],
  },
});
