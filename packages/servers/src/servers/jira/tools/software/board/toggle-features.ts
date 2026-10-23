import { defineTool } from '@usemcpkit/core';

export const softwareBoardToggleFeatures = defineTool({
  name: 'software:board:toggle_features',
  description: 'Toggle features',
  input: {
    type: 'object',
    properties: {
      boardId: {
        type: 'integer',
      },
      body_boardId: {
        type: 'integer',
      },
      enabling: {
        type: 'boolean',
      },
      feature: {
        type: 'string',
      },
    },
    required: ['boardId'],
  },
  request: {
    method: 'PUT',
    path: '/rest/agile/1.0/board/{boardId}/features',
    body: {
      boardId: 'body_boardId',
      enabling: 'enabling',
      feature: 'feature',
    },
  },
});
