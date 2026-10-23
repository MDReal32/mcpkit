import { defineTool } from '@usemcpkit/core';

export const cloudV1GroupRemoveGroupById = defineTool({
  name: 'cloud_v1:group:remove_group_by_id',
  description: '[Cloud v1] Delete user group. Delete user group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Id of the group to delete.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/rest/api/group/by-id',
    query: ['id'],
  },
});
