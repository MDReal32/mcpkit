import { defineTool } from '@usemcpkit/core';

export const softwareBoardGetFeaturesForBoard = defineTool({
  name: 'software:board:get_features_for_board',
  description: 'Get features for board',
  input: {
    type: 'object',
    properties: {
      boardId: {
        type: 'integer',
      },
    },
    required: ['boardId'],
  },
  request: {
    method: 'GET',
    path: '/rest/agile/1.0/board/{boardId}/features',
  },
});
