import { defineTool } from '@usemcpkit/core';

export const datacenterAdminDeleteGroup = defineTool({
  name: 'datacenter:admin:delete_group',
  description: '[Data Center] Delete group. Deletes the given group identified by name.',
  input: {
    type: 'object',
    properties: {
      groupName: {
        type: 'string',
        description: 'the group name to be deleted',
      },
    },
    required: ['groupName'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/admin/group/{groupName}',
  },
});
