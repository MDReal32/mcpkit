import { defineTool } from '@usemcpkit/core';

export const reposReposListAutolinks = defineTool({
  name: 'repos:repos:list_autolinks',
  description: 'Get all autolinks of a repository. Gets all autolinks that are configured for a repository.',
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
    path: '/repos/{owner}/{repo}/autolinks',
  },
});
