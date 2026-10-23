import { defineTool } from '@usemcpkit/core';

export const cloudEmbedsGetSmartLinkContentPropertiesById = defineTool({
  name: 'cloud:embeds:get_smart_link_content_properties_by_id',
  description:
    '[Cloud] Get content property for Smart Link in the content tree by id. Retrieves a specific Content Property by ID that is attached to a specified Smart Link in the content tree.',
  input: {
    type: 'object',
    properties: {
      embed_id: {
        type: 'integer',
        description: 'The ID of the Smart Link in the content tree for which content properties should be returned.',
      },
      property_id: {
        type: 'integer',
        description: 'The ID of the content property being requested.',
      },
    },
    required: ['embed_id', 'property_id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/embeds/{embed_id}/properties/{property_id}',
  },
});
