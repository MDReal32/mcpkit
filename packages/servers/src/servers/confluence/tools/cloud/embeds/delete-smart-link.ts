import { defineTool } from '@usemcpkit/core';

export const cloudEmbedsDeleteSmartLink = defineTool({
  name: 'cloud:embeds:delete_smart_link',
  description: '[Cloud] Delete Smart Link in the content tree. Delete a Smart Link in the content tree by id.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the Smart Link in the content tree to be deleted.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/api/v2/embeds/{id}',
  },
});
