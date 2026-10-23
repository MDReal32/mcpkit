import { defineTool } from '@usemcpkit/core';

export const softwareBoardGetAllQuickFilters = defineTool({
  name: 'software:board:get_all_quick_filters',
  description: 'Get all quick filters. Returns all quick filters from a board, for a given board ID.',
  input: {
    type: 'object',
    properties: {
      boardId: {
        type: 'integer',
        description: 'The ID of the board that contains the requested quick filters.',
      },
      startAt: {
        type: 'integer',
        description:
          "The starting index of the returned quick filters. Base index: 0. See the 'Pagination' section at the top of this page for more details.",
      },
      maxResults: {
        type: 'integer',
        description:
          "The maximum number of sprints to return per page. See the 'Pagination' section at the top of this page for more details.",
      },
    },
    required: ['boardId'],
  },
  request: {
    method: 'GET',
    path: '/rest/agile/1.0/board/{boardId}/quickfilter',
    query: ['startAt', 'maxResults'],
  },
});
