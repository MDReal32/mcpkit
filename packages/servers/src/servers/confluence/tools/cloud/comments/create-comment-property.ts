import { defineTool } from '@usemcpkit/core';

export const cloudCommentsCreateCommentProperty = defineTool({
  name: 'cloud:comments:create_comment_property',
  description: '[Cloud] Create content property for comment. Creates a new content property for a comment.',
  input: {
    type: 'object',
    properties: {
      comment_id: {
        type: 'integer',
        description: 'The ID of the comment to create a property for.',
      },
      key: {
        type: 'string',
        description: 'Key of the content property',
      },
      value: {
        description: 'Value of the content property.',
      },
    },
    required: ['comment_id'],
  },
  request: {
    method: 'POST',
    path: '/wiki/api/v2/comments/{comment_id}/properties',
    body: ['key', 'value'],
  },
});
