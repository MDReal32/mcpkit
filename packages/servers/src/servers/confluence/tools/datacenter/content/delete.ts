import { defineTool } from '@usemcpkit/core';

export const datacenterContentDelete = defineTool({
  name: 'datacenter:content:delete',
  description:
    '[Data Center] Delete content. Trashes or purges a piece of Content, based on its ContentType and ContentStatus.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'the id of the content.',
      },
      status: {
        type: 'string',
        description: 'the status of the content to be deleted.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/content/{id}',
    query: ['status'],
  },
});
