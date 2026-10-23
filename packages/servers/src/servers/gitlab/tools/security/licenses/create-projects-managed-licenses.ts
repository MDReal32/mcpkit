import { defineTool } from '@usemcpkit/core';

export const securityLicensesCreateProjectsManagedLicenses = defineTool({
  name: 'security:licenses:create_projects_managed_licenses',
  description: 'Create a software license policy. Creates a software license policy for a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      name: {
        type: 'string',
        description: 'Name of the license.',
      },
      approval_status: {
        type: 'string',
        description: 'Approval status of the license.',
        enum: ['allowed', 'denied'],
      },
    },
    required: ['id', 'name', 'approval_status'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/managed_licenses',
    body: ['name', 'approval_status'],
  },
});
