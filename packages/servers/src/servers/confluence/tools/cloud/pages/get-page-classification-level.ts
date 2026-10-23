import { defineTool } from '@usemcpkit/core';

export const cloudPagesGetPageClassificationLevel = defineTool({
  name: 'cloud:pages:get_page_classification_level',
  description: '[Cloud] Get page classification level. Returns the classification level for a specific page.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the page for which classification level should be returned.',
      },
      status: {
        type: 'string',
        enum: ['current', 'draft', 'archived'],
        description: 'Status of page from which classification level will fetched.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/pages/{id}/classification-level',
    query: ['status'],
  },
});
