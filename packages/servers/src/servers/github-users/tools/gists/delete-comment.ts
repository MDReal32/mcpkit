import { defineTool } from '@usemcpkit/core';

export const gistsDeleteComment = defineTool({
  name: 'gists:delete_comment',
  description: 'Delete a gist comment',
  input: {
    type: 'object',
    properties: {
      gist_id: {
        type: 'string',
        description: 'The unique identifier of the gist.',
      },
      comment_id: {
        type: 'integer',
        description: 'The unique identifier of the comment.',
      },
    },
    required: ['gist_id', 'comment_id'],
  },
  request: {
    method: 'DELETE',
    path: '/gists/{gist_id}/comments/{comment_id}',
  },
});
