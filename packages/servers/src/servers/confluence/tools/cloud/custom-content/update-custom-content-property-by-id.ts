import { defineTool } from '@usemcpkit/core';

export const cloudCustomContentUpdateCustomContentPropertyById = defineTool({
  name: 'cloud:custom_content:update_custom_content_property_by_id',
  description:
    '[Cloud] Update content property for custom content by id. Update a content property for a piece of custom content by its id.',
  input: {
    type: 'object',
    properties: {
      custom_content_id: {
        type: 'integer',
        description: 'The ID of the custom content the property belongs to.',
      },
      property_id: {
        type: 'integer',
        description: 'The ID of the property to be updated.',
      },
      key: {
        type: 'string',
        description: 'Key of the content property',
      },
      value: {
        description: 'Value of the content property.',
      },
      version: {
        type: 'object',
        description: 'New version number and associated message',
        properties: {
          number: {
            type: 'integer',
            description: 'Version number of the new version. Should be 1 more than the current version number.',
          },
          message: {
            type: 'string',
            description: 'Message to be associated with the new version.',
          },
        },
      },
    },
    required: ['custom_content_id', 'property_id'],
  },
  request: {
    method: 'PUT',
    path: '/wiki/api/v2/custom-content/{custom_content_id}/properties/{property_id}',
    body: ['key', 'value', 'version'],
  },
});
