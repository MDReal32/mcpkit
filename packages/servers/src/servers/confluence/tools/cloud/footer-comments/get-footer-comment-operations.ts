import { defineTool } from '@usemcpkit/core';

export const cloudFooterCommentsGetFooterCommentOperations = defineTool({
  name: 'cloud:footer_comments:get_footer_comment_operations',
  description:
    '[Cloud] Get permitted operations for footer comment. Returns the permitted operations on specific footer comment.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the footer comment for which operations should be returned.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/footer-comments/{id}/operations',
  },
});
