import { defineTool } from '@usemcpkit/core';

export const usersGistsFork = defineTool({
  name: 'users:gists:fork',
  description: 'Fork a gist',
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
    method: 'POST',
    path: '/gists/{gist_id}/forks',
  },
});
