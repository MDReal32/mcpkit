import { defineTool } from '@usemcpkit/core';

export const cloudPagesGetPageOperations = defineTool({
  name: 'cloud:pages:get_page_operations',
  description: '[Cloud] Get permitted operations for page. Returns the permitted operations on specific page.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the page for which operations should be returned.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/pages/{id}/operations',
  },
});
