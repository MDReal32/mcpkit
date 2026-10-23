import { defineTool } from '@usemcpkit/core';

export const issuesBoardsGetGroupsBoardsLists = defineTool({
  name: 'issues:boards:get_groups_boards_lists',
  description: 'Retrieve a group issue board list. Retrieves a specified group issue board list.',
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
    method: 'GET',
    path: '/groups/{id}/boards/{board_id}/lists/{list_id}',
  },
});
