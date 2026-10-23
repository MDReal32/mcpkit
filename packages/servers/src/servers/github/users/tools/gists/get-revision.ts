import { defineTool } from '@usemcpkit/core';

export const gistsGetRevision = defineTool({
  name: 'gists:get_revision',
  description: 'Get a gist revision. Gets a specified gist revision.',
  input: {
    type: 'object',
    properties: {
      gist_id: {
        type: 'string',
        description: 'The unique identifier of the gist.',
      },
      sha: {
        type: 'string',
      },
    },
    required: ['gist_id', 'sha'],
  },
  request: {
    method: 'GET',
    path: '/gists/{gist_id}/{sha}',
  },
});
