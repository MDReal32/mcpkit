import { defineTool } from '@usemcpkit/core';

export const reposReposGetReadme = defineTool({
  name: 'repos:repos:get_readme',
  description: 'Get a repository README. Gets the preferred README for a repository.',
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
      ref: {
        type: 'string',
        description: 'The name of the commit/branch/tag. Default: the repository’s default branch.',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/readme',
    query: ['ref'],
  },
});
