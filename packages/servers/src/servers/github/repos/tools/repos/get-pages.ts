import { defineTool } from '@usemcpkit/core';

export const reposGetPages = defineTool({
  name: 'repos:get_pages',
  description: 'Get a GitHub Pages site. Gets information about a GitHub Pages site.',
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
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/pages',
  },
});
