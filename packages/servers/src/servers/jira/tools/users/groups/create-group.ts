import { defineTool } from '@usemcpkit/core';

export const usersGroupsCreateGroup = defineTool({
  name: 'users:groups:create_group',
  description: 'Create group. Creates a group.',
  input: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the group.',
      },
    },
    required: ['name'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/group',
    body: ['name'],
  },
});
