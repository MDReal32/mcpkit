import { defineTool } from '@usemcpkit/core';

export const datacenterContentDeleteProperty = defineTool({
  name: 'datacenter:content:delete_property',
  description: '[Data Center] Delete content property. Deletes a content property.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      key: {
        type: 'string',
        description: 'the key of the content property. Required.',
      },
    },
    required: ['id', 'key'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/content/{id}/property/{key}',
  },
});
