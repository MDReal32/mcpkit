import { defineTool } from '@usemcpkit/core';

export const cloudFooterCommentsCreateFooterComment = defineTool({
  name: 'cloud:footer_comments:create_footer_comment',
  description: '[Cloud] Create footer comment. Create a footer comment.',
  input: {
    type: 'object',
    properties: {
      blogPostId: {
        type: 'string',
        description:
          'ID of the containing blog post, if intending to create a top level footer comment. Do not provide if creating a reply.',
      },
      pageId: {
        type: 'string',
        description:
          'ID of the containing page, if intending to create a top level footer comment. Do not provide if creating a reply.',
      },
      parentCommentId: {
        type: 'string',
        description:
          'ID of the parent comment, if intending to create a reply. Do not provide if creating a top level comment.',
      },
      attachmentId: {
        type: 'string',
        description: 'ID of the attachment, if intending to create a comment against an attachment.',
      },
      customContentId: {
        type: 'string',
        description: 'ID of the custom content, if intending to create a comment against a custom content.',
      },
      body: {
        type: 'object',
        properties: {
          representation: {
            type: 'string',
            description: 'Type of content representation used for the value field.',
            enum: ['storage', 'atlas_doc_format', 'wiki'],
          },
          value: {
            type: 'string',
            description: 'Body of the comment, in the format found in the representation field.',
          },
          storage: {
            type: 'object',
          },
          atlas_doc_format: {
            type: 'object',
          },
          wiki: {
            type: 'object',
          },
        },
      },
    },
  },
  request: {
    method: 'POST',
    path: '/wiki/api/v2/footer-comments',
    body: ['blogPostId', 'pageId', 'parentCommentId', 'attachmentId', 'customContentId', 'body'],
  },
});
