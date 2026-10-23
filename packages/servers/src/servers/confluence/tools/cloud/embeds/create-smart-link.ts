import { defineTool } from '@usemcpkit/core';

export const cloudEmbedsCreateSmartLink = defineTool({
  name: 'cloud:embeds:create_smart_link',
  description: '[Cloud] Create Smart Link in the content tree. Creates a Smart Link in the content tree in the space.',
  input: {
    type: 'object',
    properties: {
      spaceId: {
        type: 'string',
        description: 'ID of the space.',
      },
      title: {
        type: 'string',
        description: 'Title of the Smart Link in the content tree.',
      },
      parentId: {
        type: 'string',
        description: 'The parent content ID of the Smart Link in the content tree.',
      },
      embedUrl: {
        type: 'string',
        description: 'The URL that the Smart Link in the content tree should be populated with.',
      },
    },
    required: ['spaceId'],
  },
  request: {
    method: 'POST',
    path: '/wiki/api/v2/embeds',
    body: ['spaceId', 'title', 'parentId', 'embedUrl'],
  },
});
