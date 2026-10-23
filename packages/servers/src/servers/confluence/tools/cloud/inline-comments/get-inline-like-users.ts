import { defineTool } from '@usemcpkit/core';

export const cloudInlineCommentsGetInlineLikeUsers = defineTool({
  name: 'cloud:inline_comments:get_inline_like_users',
  description:
    '[Cloud] Get account IDs of likes for inline comment. Returns the account IDs of likes of specific inline comment.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the inline comment for which like count should be returned.',
      },
      cursor: {
        type: 'string',
        description:
          'Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the relative URL in the `Link` header to retrieve the `next` set of results.',
      },
      limit: {
        type: 'integer',
        description:
          'Maximum number of account IDs per result to return. If more results exist, use the `Link` header to retrieve a relative URL that will return the next set of results.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/inline-comments/{id}/likes/users',
    query: ['cursor', 'limit'],
  },
});
