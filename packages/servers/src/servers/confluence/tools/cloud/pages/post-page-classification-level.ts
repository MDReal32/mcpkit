import { defineTool } from '@usemcpkit/core';

export const cloudPagesPostPageClassificationLevel = defineTool({
  name: 'cloud:pages:post_page_classification_level',
  description:
    '[Cloud] Reset page classification level. Resets the classification level for a specific page for the space default classification level.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the page for which classification level should be updated.',
      },
      status: {
        type: 'string',
        description: 'Status of the content.',
        enum: ['current', 'draft'],
      },
    },
    required: ['id', 'status'],
  },
  request: {
    method: 'POST',
    path: '/wiki/api/v2/pages/{id}/classification-level/reset',
    body: ['status'],
  },
});
