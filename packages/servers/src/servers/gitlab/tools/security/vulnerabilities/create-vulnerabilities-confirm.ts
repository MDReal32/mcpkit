import { defineTool } from '@usemcpkit/core';

export const securityVulnerabilitiesCreateVulnerabilitiesConfirm = defineTool({
  name: 'security:vulnerabilities:create_vulnerabilities_confirm',
  description:
    'Confirm a vulnerability. Confirms a specified vulnerability, marking it as genuine and requiring action. Returns status code `304` if the vulnerability is already confirmed. Returns status code `403` if the authenticated user does not have permission to change the vulnerability status.',
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
    path: '/vulnerabilities/{id}/confirm',
    body: ['comment'],
  },
});
