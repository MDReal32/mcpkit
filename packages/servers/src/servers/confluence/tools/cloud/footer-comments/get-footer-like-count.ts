import { defineTool } from '@usemcpkit/core';

export const cloudFooterCommentsGetFooterLikeCount = defineTool({
  name: 'cloud:footer_comments:get_footer_like_count',
  description: '[Cloud] Get like count for footer comment. Returns the count of likes of specific footer comment.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the footer comment for which like count should be returned.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/footer-comments/{id}/likes/count',
  },
});
