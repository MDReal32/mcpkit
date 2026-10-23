import { defineTool } from '@usemcpkit/core';

export const issuesBoardsGetProjectsBoards = defineTool({
  name: 'issues:boards:get_projects_boards',
  description: 'Retrieve an issue board. Retrieves a specified issue board in a project.',
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
    },
    required: ['id', 'board_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/boards/{board_id}',
  },
});
