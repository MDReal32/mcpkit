import { defineTool } from '@usemcpkit/core';

export const issuesBoardsDeleteGroupsBoards = defineTool({
  name: 'issues:boards:delete_groups_boards',
  description: 'Delete a group issue board. Deletes a specified group issue board.',
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
    method: 'DELETE',
    path: '/groups/{id}/boards/{board_id}',
  },
});
