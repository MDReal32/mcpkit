import { defineTool } from '@usemcpkit/core';

export const datacenterContentDeleteLabel = defineTool({
  name: 'datacenter:content:delete_label',
  description: '[Data Center] Delete label with query param. Deletes a labels to the specified content.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      name: {
        type: 'string',
        description: 'the name of the label to be removed from the content',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/content/{id}/label',
    query: ['name'],
  },
});
