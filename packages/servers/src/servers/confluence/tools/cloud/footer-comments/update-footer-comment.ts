import { defineTool } from '@usemcpkit/core';

export const cloudFooterCommentsUpdateFooterComment = defineTool({
  name: 'cloud:footer_comments:update_footer_comment',
  description:
    '[Cloud] Update footer comment. Update a footer comment. This can be used to update the body text of a comment.',
  input: {
    type: 'object',
    properties: {
      comment_id: {
        type: 'integer',
        description: 'The ID of the comment to be retrieved.',
      },
      version: {
        type: 'object',
        properties: {
          number: {
            type: 'integer',
            description: 'Number of new version. Should be 1 higher than current version of the comment.',
          },
          message: {
            type: 'string',
            description: 'Optional message store for the new version.',
          },
        },
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
      _links: {
        type: 'object',
        properties: {
          base: {
            type: 'string',
            description: 'Base url of the Confluence site.',
          },
        },
      },
    },
    required: ['comment_id'],
  },
  request: {
    method: 'PUT',
    path: '/wiki/api/v2/footer-comments/{comment_id}',
    body: ['version', 'body', '_links'],
  },
});
