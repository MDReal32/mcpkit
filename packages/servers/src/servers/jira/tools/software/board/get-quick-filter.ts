import { defineTool } from '@usemcpkit/core';

export const softwareBoardGetQuickFilter = defineTool({
  name: 'software:board:get_quick_filter',
  description:
    'Get quick filter. Returns the quick filter for a given quick filter ID. The quick filter will only be returned if the user can view the board that the quick filter belongs to.',
  input: {
    type: 'object',
    properties: {
      boardId: {
        type: 'integer',
      },
      quickFilterId: {
        type: 'integer',
        description: 'The ID of the requested quick filter.',
      },
    },
    required: ['boardId', 'quickFilterId'],
  },
  request: {
    method: 'GET',
    path: '/rest/agile/1.0/board/{boardId}/quickfilter/{quickFilterId}',
  },
});
