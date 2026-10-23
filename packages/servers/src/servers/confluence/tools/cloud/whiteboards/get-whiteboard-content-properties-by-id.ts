import { defineTool } from '@usemcpkit/core';

export const cloudWhiteboardsGetWhiteboardContentPropertiesById = defineTool({
  name: 'cloud:whiteboards:get_whiteboard_content_properties_by_id',
  description:
    '[Cloud] Get content property for whiteboard by id. Retrieves a specific Content Property by ID that is attached to a specified whiteboard.',
  input: {
    type: 'object',
    properties: {
      whiteboard_id: {
        type: 'integer',
        description: 'The ID of the whiteboard for which content properties should be returned.',
      },
      property_id: {
        type: 'integer',
        description: 'The ID of the content property being requested.',
      },
    },
    required: ['whiteboard_id', 'property_id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/whiteboards/{whiteboard_id}/properties/{property_id}',
  },
});
