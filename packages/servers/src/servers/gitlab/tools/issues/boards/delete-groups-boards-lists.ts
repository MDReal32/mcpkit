import { defineTool } from '@usemcpkit/core';

export const issuesBoardsDeleteGroupsBoardsLists = defineTool({
  name: 'issues:boards:delete_groups_boards_lists',
  description:
    'Delete a group issue board list. Deletes a specified group issue board list. Only for administrators and users with the Owner role for the group.',
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
      list_id: {
        type: 'integer',
        description: "ID of the board's list.",
      },
    },
    required: ['id', 'board_id', 'list_id'],
  },
  request: {
    method: 'DELETE',
    path: '/groups/{id}/boards/{board_id}/lists/{list_id}',
  },
});
