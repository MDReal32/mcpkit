import { defineTool } from '@usemcpkit/core';

export const issuesBoardsListProjectsBoardsLists = defineTool({
  name: 'issues:boards:list_projects_boards_lists',
  description:
    'List all board lists in an issue board. Lists all lists in a specified issue board. Does not include `open` and `closed` lists.',
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
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
    required: ['id', 'board_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/boards/{board_id}/lists',
    query: ['page', 'per_page'],
  },
});
