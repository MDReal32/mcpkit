import { defineTool } from '@usemcpkit/core';

export const cloudBlogpostsPostRedactBlog = defineTool({
  name: 'cloud:blogposts:post_redact_blog',
  description:
    '[Cloud] Redact Content in a Confluence Blog Post. Redacts sensitive content in a Confluence blog post by replacing specified text ranges with redaction markers. Each redaction in the response includes a unique UUID for restoration (except code block redactions). The response metadata items maintain the same order as the input redaction pointers, and completely overlapping redactions are merged into a single redaction with one UUID.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the blog post to redact content from.',
      },
      createdAt: {
        type: 'string',
        description: 'Timestamp when the content was last updated.',
      },
      cleanHistory: {
        type: 'boolean',
        description:
          'Whether to clean up previous versions containing the redaction. When true, historical versions of the content that contain the redacted text will be squashed.',
      },
      versionNumber: {
        type: 'integer',
        description:
          'Optional version number of the content to redact. When specified, the redaction will target a specific historical version of the content rather than the current version.',
      },
      body: {
        type: 'object',
        properties: {
          redactions: {
            type: 'array',
            items: {
              type: 'object',
            },
          },
        },
      },
      title: {
        type: 'object',
        properties: {
          redactions: {
            type: 'array',
            items: {
              type: 'object',
            },
          },
        },
      },
    },
    required: ['id', 'createdAt'],
  },
  request: {
    method: 'POST',
    path: '/wiki/api/v2/blogposts/{id}/redact',
    body: ['createdAt', 'cleanHistory', 'versionNumber', 'body', 'title'],
  },
});
