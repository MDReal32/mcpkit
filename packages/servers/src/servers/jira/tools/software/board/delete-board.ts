import { defineTool } from '@usemcpkit/core';

export const softwareBoardDeleteBoard = defineTool({
  name: 'software:board:delete_board',
  description: 'Delete board. Deletes the board. Admin without the view permission can still remove the board.',
  input: {
    type: 'object',
    properties: {
      boardId: {
        type: 'integer',
        description: 'ID of the board to be deleted',
      },
    },
    required: ['boardId'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/agile/1.0/board/{boardId}',
  },
});
