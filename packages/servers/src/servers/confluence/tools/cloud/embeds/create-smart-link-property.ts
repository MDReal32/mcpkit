import { defineTool } from '@usemcpkit/core';

export const cloudEmbedsCreateSmartLinkProperty = defineTool({
  name: 'cloud:embeds:create_smart_link_property',
  description:
    '[Cloud] Create content property for Smart Link in the content tree. Creates a new content property for a Smart Link in the content tree.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the Smart Link in the content tree to create a property for.',
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
    path: '/wiki/api/v2/embeds/{id}/properties',
    body: ['key', 'value'],
  },
});
