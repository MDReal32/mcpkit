import { defineTool } from '@usemcpkit/core';

export const issuesBoardsDeleteProjectsBoardsLists = defineTool({
  name: 'issues:boards:delete_projects_boards_lists',
  description: 'Delete a list from an issue board. Deletes a specified list from an issue board.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
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
    path: '/projects/{id}/boards/{board_id}/lists/{list_id}',
  },
});
