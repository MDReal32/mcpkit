import { defineTool } from '@usemcpkit/core';

export const softwareBoardGetBoardByFilterId = defineTool({
  name: 'software:board:get_board_by_filter_id',
  description:
    'Get board by filter id. Returns any boards which use the provided filter id. This method can be executed by users without a valid software license in order to find which boards are using a particular filter.',
  input: {
    type: 'object',
    properties: {
      filterId: {
        type: 'integer',
        description: 'Filters results to boards that are relevant to a filter. Not supported for next-gen boards.',
      },
      startAt: {
        type: 'integer',
        description:
          "The starting index of the returned boards. Base index: 0. See the 'Pagination' section at the top of this page for more details.",
      },
      maxResults: {
        type: 'integer',
        description:
          "The maximum number of boards to return per page. Default: 50. See the 'Pagination' section at the top of this page for more details.",
      },
    },
    required: ['filterId'],
  },
  request: {
    method: 'GET',
    path: '/rest/agile/1.0/board/filter/{filterId}',
    query: ['startAt', 'maxResults'],
  },
});
