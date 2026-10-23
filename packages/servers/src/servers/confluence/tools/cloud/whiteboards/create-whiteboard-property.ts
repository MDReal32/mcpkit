import { defineTool } from '@usemcpkit/core';

export const cloudWhiteboardsCreateWhiteboardProperty = defineTool({
  name: 'cloud:whiteboards:create_whiteboard_property',
  description: '[Cloud] Create content property for whiteboard. Creates a new content property for a whiteboard.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the whiteboard to create a property for.',
      },
      key: {
        type: 'string',
        description: 'Key of the content property',
      },
      value: {
        description: 'Value of the content property.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/wiki/api/v2/whiteboards/{id}/properties',
    body: ['key', 'value'],
  },
});
