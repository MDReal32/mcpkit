import { defineTool } from '@usemcpkit/core';

export const metaMarkdownRender = defineTool({
  name: 'meta:markdown:render',
  description:
    'Render a Markdown document. Depending on what is rendered in the Markdown, you may need to provide additional token scopes for labels, such as `issues:read` or `pull_requests:read`.',
  input: {
    type: 'object',
    properties: {
      text: {
        type: 'string',
        description: 'The Markdown text to render in HTML.',
      },
      mode: {
        type: 'string',
        description: 'The rendering mode.',
        default: 'markdown',
        enum: ['markdown', 'gfm'],
      },
      context: {
        type: 'string',
        description:
          'The repository context to use when creating references in `gfm` mode. For example, setting `context` to `octo-org/octo-repo` will change the text `#42` into an HTML link to issue 42 in the `octo-org/octo-repo` repository.',
      },
    },
    required: ['text'],
  },
  request: {
    method: 'POST',
    path: '/markdown',
    body: ['text', 'mode', 'context'],
  },
});
