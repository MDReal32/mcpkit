import { defineTool } from '@usemcpkit/core';

export const securityVulnerabilitiesGetVulnerabilities = defineTool({
  name: 'security:vulnerabilities:get_vulnerabilities',
  description: 'Retrieve a vulnerability. Retrieves a specified vulnerability.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID of the vulnerability.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/vulnerabilities/{id}',
  },
});
