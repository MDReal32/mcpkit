import { defineTool } from '@usemcpkit/core';

export const groupsGroupsCreateGroupsRestore = defineTool({
  name: 'groups:groups:create_groups_restore',
  description:
    'Restore a group. Restores a specified group that was previously scheduled for deletion. Can not restore groups outside of the retention period (30 days by default).',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/restore',
  },
});
