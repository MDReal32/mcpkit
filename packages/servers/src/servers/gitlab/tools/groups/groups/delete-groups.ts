import { defineTool } from '@usemcpkit/core';

export const groupsGroupsDeleteGroups = defineTool({
  name: 'groups:groups:delete_groups',
  description:
    'Schedule a group for deletion. Schedules a group for deletion. Groups are deleted at the end of the retention period (30 days by default). Use the `permanently_remove` param to override the retention period.',
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
    method: 'DELETE',
    path: '/groups/{id}',
  },
});
