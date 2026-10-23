import { defineTool } from '@usemcpkit/core';

export const cloudEmbedsDeleteSmartLinkPropertyById = defineTool({
  name: 'cloud:embeds:delete_smart_link_property_by_id',
  description:
    '[Cloud] Delete content property for Smart Link in the content tree by id. Deletes a content property for a Smart Link in the content tree by its id.',
  input: {
    type: 'object',
    properties: {
      embed_id: {
        type: 'integer',
        description: 'The ID of the Smart Link in the content tree the property belongs to.',
      },
      property_id: {
        type: 'integer',
        description: 'The ID of the property to be deleted.',
      },
    },
    required: ['embed_id', 'property_id'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/api/v2/embeds/{embed_id}/properties/{property_id}',
  },
});
