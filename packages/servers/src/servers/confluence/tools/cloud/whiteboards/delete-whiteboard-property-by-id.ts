import { defineTool } from '@usemcpkit/core';

export const cloudWhiteboardsDeleteWhiteboardPropertyById = defineTool({
  name: 'cloud:whiteboards:delete_whiteboard_property_by_id',
  description:
    '[Cloud] Delete content property for whiteboard by id. Deletes a content property for a whiteboard by its id.',
  input: {
    type: 'object',
    properties: {
      whiteboard_id: {
        type: 'integer',
        description: 'The ID of the whiteboard the property belongs to.',
      },
      property_id: {
        type: 'integer',
        description: 'The ID of the property to be deleted.',
      },
    },
    required: ['whiteboard_id', 'property_id'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/api/v2/whiteboards/{whiteboard_id}/properties/{property_id}',
  },
});
