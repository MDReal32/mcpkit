import { defineTool } from '@usemcpkit/core';

export const groupsGroupsCreateGroupsArchive = defineTool({
  name: 'groups:groups:create_groups_archive',
  description:
    'Archive a group. Archives a specified group. You must be an administrator or have the Owner role for the group.',
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
    path: '/groups/{id}/archive',
  },
});
