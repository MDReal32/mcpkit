import { defineTool } from '@usemcpkit/core';

export const cloudInlineCommentsUpdateInlineComment = defineTool({
  name: 'cloud:inline_comments:update_inline_comment',
  description:
    '[Cloud] Update inline comment. Update an inline comment. This can be used to update the body text of a comment and/or to resolve the comment',
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
      resolved: {
        type: 'boolean',
        description:
          'Resolved state of the comment. Set to true to resolve the comment, set to false to reopen it. If matching the existing state (i.e. true -> resolved or false -> open/reopened) , no change will occur. A dangling comment cannot be updated.',
      },
    },
    required: ['comment_id'],
  },
  request: {
    method: 'PUT',
    path: '/wiki/api/v2/inline-comments/{comment_id}',
    body: ['version', 'body', 'resolved'],
  },
});
