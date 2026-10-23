import { defineTool } from '@usemcpkit/core';

export const gistsCreateComment = defineTool({
  name: 'gists:create_comment',
  description: 'Create a gist comment. Creates a comment on a gist.',
  input: {
    type: 'object',
    properties: {
      gist_id: {
        type: 'string',
        description: 'The unique identifier of the gist.',
      },
      body: {
        type: 'string',
        description: 'The comment text.',
      },
    },
    required: ['gist_id', 'body'],
  },
  request: {
    method: 'POST',
    path: '/gists/{gist_id}/comments',
    body: ['body'],
  },
});
