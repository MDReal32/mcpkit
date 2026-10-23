import { defineTool } from '@usemcpkit/core';

export const gistsCheckIsStarred = defineTool({
  name: 'gists:check_is_starred',
  description: 'Check if a gist is starred',
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
    method: 'GET',
    path: '/gists/{gist_id}/star',
  },
});
