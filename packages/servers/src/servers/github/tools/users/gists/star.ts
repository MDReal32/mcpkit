import { defineTool } from '@usemcpkit/core';

export const usersGistsStar = defineTool({
  name: 'users:gists:star',
  description:
    'Star a gist. Note that you\'ll need to set `Content-Length` to zero when calling out to this endpoint. For more information, see "HTTP method."',
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
    method: 'PUT',
    path: '/gists/{gist_id}/star',
  },
});
