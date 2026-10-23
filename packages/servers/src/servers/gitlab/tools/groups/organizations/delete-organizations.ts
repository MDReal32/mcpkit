import { defineTool } from '@usemcpkit/core';

export const groupsOrganizationsDeleteOrganizations = defineTool({
  name: 'groups:organizations:delete_organizations',
  description: 'Soft-delete an organization. This feature was introduced in GitLab 19.2.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the organization.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/organizations/{id}',
  },
});
