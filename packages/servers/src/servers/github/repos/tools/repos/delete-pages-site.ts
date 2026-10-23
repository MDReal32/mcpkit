import { defineTool } from '@usemcpkit/core';

export const reposDeletePagesSite = defineTool({
  name: 'repos:delete_pages_site',
  description:
    'Delete a GitHub Pages site. Deletes a GitHub Pages site. For more information, see "About GitHub Pages.',
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
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/pages',
  },
});
