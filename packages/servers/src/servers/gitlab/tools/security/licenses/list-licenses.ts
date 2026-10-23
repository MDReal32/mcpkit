import { defineTool } from '@usemcpkit/core';

export const securityLicensesListLicenses = defineTool({
  name: 'security:licenses:list_licenses',
  description: 'List all licenses. Lists all information about all licenses.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/licenses',
  },
});
