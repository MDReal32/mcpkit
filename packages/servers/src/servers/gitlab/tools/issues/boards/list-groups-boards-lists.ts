import { defineTool } from '@usemcpkit/core';

export const issuesBoardsListGroupsBoardsLists = defineTool({
  name: 'issues:boards:list_groups_boards_lists',
  description:
    'List all group issue board lists. Lists all group issue board lists for a specified board. Does not include `open` and `closed` lists.',
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
    path: '/groups/{id}/boards/{board_id}/lists',
    query: ['page', 'per_page'],
  },
});
