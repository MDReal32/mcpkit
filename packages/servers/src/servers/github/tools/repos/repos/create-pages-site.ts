import { defineTool } from '@usemcpkit/core';

export const reposReposCreatePagesSite = defineTool({
  name: 'repos:repos:create_pages_site',
  description:
    'Create a GitHub Pages site. Configures a GitHub Pages site. For more information, see "About GitHub Pages."',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      build_type: {
        type: 'string',
        description: 'The process in which the Page will be built. Possible values are `"legacy"` and `"workflow"`.',
        enum: ['legacy', 'workflow'],
      },
      source: {
        type: 'object',
        description: 'The source branch and directory used to publish your Pages site.',
        properties: {
          branch: {
            type: 'string',
            description: "The repository branch used to publish your site's source files.",
          },
          path: {
            type: 'string',
            description:
              'The repository directory that includes the source files for the Pages site. Allowed paths are `/` or `/docs`. Default: `/`',
            default: '/',
            enum: ['/', '/docs'],
          },
        },
        required: ['branch'],
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/pages',
    body: ['build_type', 'source'],
  },
});
