import { defineTool } from '@usemcpkit/core';

export const usersGistsGet = defineTool({
  name: 'users:gists:get',
  description: 'Get a gist. Gets a specified gist.',
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
    path: '/gists/{gist_id}',
  },
});
