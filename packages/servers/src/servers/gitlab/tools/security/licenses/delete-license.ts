import { defineTool } from '@usemcpkit/core';

export const securityLicensesDeleteLicense = defineTool({
  name: 'security:licenses:delete_license',
  description: 'Delete a license. Deletes a specified license.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the GitLab license.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/license/{id}',
  },
});
