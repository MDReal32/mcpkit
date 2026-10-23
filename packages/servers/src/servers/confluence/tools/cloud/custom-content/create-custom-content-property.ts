import { defineTool } from '@usemcpkit/core';

export const cloudCustomContentCreateCustomContentProperty = defineTool({
  name: 'cloud:custom_content:create_custom_content_property',
  description:
    '[Cloud] Create content property for custom content. Creates a new content property for a piece of custom content.',
  input: {
    type: 'object',
    properties: {
      custom_content_id: {
        type: 'integer',
        description: 'The ID of the custom content to create a property for.',
      },
      key: {
        type: 'string',
        description: 'Key of the content property',
      },
      value: {
        description: 'Value of the content property.',
      },
    },
    required: ['custom_content_id'],
  },
  request: {
    method: 'POST',
    path: '/wiki/api/v2/custom-content/{custom_content_id}/properties',
    body: ['key', 'value'],
  },
});
