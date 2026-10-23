import { defineTool } from '@usemcpkit/core';

export const cloudPagesUpdatePagePropertyById = defineTool({
  name: 'cloud:pages:update_page_property_by_id',
  description: '[Cloud] Update content property for page by id. Update a content property for a page by its id.',
  input: {
    type: 'object',
    properties: {
      page_id: {
        type: 'integer',
        description: 'The ID of the page the property belongs to.',
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
    required: ['page_id', 'property_id'],
  },
  request: {
    method: 'PUT',
    path: '/wiki/api/v2/pages/{page_id}/properties/{property_id}',
    body: ['key', 'value', 'version'],
  },
});
