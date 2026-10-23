import { defineTool } from '@usemcpkit/core';

export const issuesBoardsGetGroupsBoards = defineTool({
  name: 'issues:boards:get_groups_boards',
  description: 'Retrieve a group issue board. Retrieves a specified group issue board.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      board_id: {
        type: 'integer',
        description: 'ID of the board.',
      },
    },
    required: ['id', 'board_id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/boards/{board_id}',
  },
});
