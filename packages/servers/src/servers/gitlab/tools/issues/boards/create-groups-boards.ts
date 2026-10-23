import { defineTool } from '@usemcpkit/core';

export const issuesBoardsCreateGroupsBoards = defineTool({
  name: 'issues:boards:create_groups_boards',
  description: 'Create a group issue board. Creates a group issue board for a specified group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      name: {
        type: 'string',
        description: 'Name of the board.',
      },
    },
    required: ['id', 'name'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/boards',
    body: ['name'],
  },
});
