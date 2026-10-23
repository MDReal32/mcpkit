import { defineTool } from '@usemcpkit/core';

export const reposReposGetPagesBuild = defineTool({
  name: 'repos:repos:get_pages_build',
  description: 'Get GitHub Pages build. Gets information about a GitHub Pages build.',
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
      build_id: {
        type: 'integer',
      },
    },
    required: ['owner', 'repo', 'build_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/pages/builds/{build_id}',
  },
});
