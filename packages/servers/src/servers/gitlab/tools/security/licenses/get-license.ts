import { defineTool } from '@usemcpkit/core';

export const securityLicensesGetLicense = defineTool({
  name: 'security:licenses:get_license',
  description: 'Retrieve license information. Retrieves information about the current license.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/license',
  },
});
