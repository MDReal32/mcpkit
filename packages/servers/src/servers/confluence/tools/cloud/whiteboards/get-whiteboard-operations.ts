import { defineTool } from '@usemcpkit/core';

export const cloudWhiteboardsGetWhiteboardOperations = defineTool({
  name: 'cloud:whiteboards:get_whiteboard_operations',
  description:
    '[Cloud] Get permitted operations for a whiteboard. Returns the permitted operations on specific whiteboard.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the whiteboard for which operations should be returned.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/whiteboards/{id}/operations',
  },
});
