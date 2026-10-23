import { defineTool } from '@usemcpkit/core';

export const cloudFooterCommentsDeleteFooterComment = defineTool({
  name: 'cloud:footer_comments:delete_footer_comment',
  description:
    '[Cloud] Delete footer comment. Deletes a footer comment. This is a permanent deletion and cannot be reverted.',
  input: {
    type: 'object',
    properties: {
      comment_id: {
        type: 'integer',
        description: 'The ID of the comment to be retrieved.',
      },
    },
    required: ['comment_id'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/api/v2/footer-comments/{comment_id}',
  },
});
