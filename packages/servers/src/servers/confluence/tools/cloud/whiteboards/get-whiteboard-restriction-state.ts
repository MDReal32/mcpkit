import { defineTool } from '@usemcpkit/core';

export const cloudWhiteboardsGetWhiteboardRestrictionState = defineTool({
  name: 'cloud:whiteboards:get_whiteboard_restriction_state',
  description: '[Cloud] Get whiteboard restriction state. Returns the restriction state of a whiteboard.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the whiteboard.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/whiteboards/{id}/restriction-state',
  },
});
