import { defineTool } from '@usemcpkit/core';

export const cloudPagesDeletePagePropertyById = defineTool({
  name: 'cloud:pages:delete_page_property_by_id',
  description: '[Cloud] Delete content property for page by id. Deletes a content property for a page by its id.',
  input: {
    type: 'object',
    properties: {
      page_id: {
        type: 'integer',
        description: 'The ID of the page the property belongs to.',
      },
      property_id: {
        type: 'integer',
        description: 'The ID of the property to be deleted.',
      },
    },
    required: ['page_id', 'property_id'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/api/v2/pages/{page_id}/properties/{property_id}',
  },
});
