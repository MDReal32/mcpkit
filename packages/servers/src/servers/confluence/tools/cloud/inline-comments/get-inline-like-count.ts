import { defineTool } from '@usemcpkit/core';

export const cloudInlineCommentsGetInlineLikeCount = defineTool({
  name: 'cloud:inline_comments:get_inline_like_count',
  description: '[Cloud] Get like count for inline comment. Returns the count of likes of specific inline comment.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the inline comment for which like count should be returned.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/inline-comments/{id}/likes/count',
  },
});
