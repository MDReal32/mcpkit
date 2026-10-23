import { defineTool } from '@usemcpkit/core';

export const cloudInlineCommentsCreateInlineComment = defineTool({
  name: 'cloud:inline_comments:create_inline_comment',
  description:
    '[Cloud] Create inline comment. Create an inline comment. This can be at the top level (specifying pageId or blogPostId in the request body) or as a reply (specifying parentCommentId in the request body). Note the inlineCommentProperties object in the request body is used to select the text the inline comment should be tied to. This is what determines the text highlighting when viewing a page in Confluence.',
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
      inlineCommentProperties: {
        type: 'object',
        description:
          'Object describing the text to highlight on the page/blog post. Only applicable for top level inline comments (not replies) and required in that case.',
        properties: {
          textSelection: {
            type: 'string',
            description: 'The text to highlight',
          },
          textSelectionMatchCount: {
            type: 'integer',
            description:
              'The number of matches for the selected text on the page (should be strictly greater than textSelectionMatchIndex)',
          },
          textSelectionMatchIndex: {
            type: 'integer',
            description:
              'The match index to highlight. This is zero-based. E.g. if you have 3 occurrences of "hello world" on a page and you want to highlight the second occurrence, you should pass 1 for textSelectionMatchIndex and 3 for textSelectionMatchCount.',
          },
        },
      },
    },
  },
  request: {
    method: 'POST',
    path: '/wiki/api/v2/inline-comments',
    body: ['blogPostId', 'pageId', 'parentCommentId', 'body', 'inlineCommentProperties'],
  },
});
