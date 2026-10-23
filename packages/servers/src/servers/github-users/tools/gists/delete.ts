import { defineTool } from '@usemcpkit/core';

export const gistsDelete = defineTool({
  name: 'gists:delete',
  description: 'Delete a gist',
  input: {
    type: 'object',
    properties: {
      gist_id: {
        type: 'string',
        description: 'The unique identifier of the gist.',
      },
    },
    required: ['gist_id'],
  },
  request: {
    method: 'DELETE',
    path: '/gists/{gist_id}',
  },
});
