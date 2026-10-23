import { defineTool } from '@usemcpkit/core';

export const reposGetHashAlgorithm = defineTool({
  name: 'repos:get_hash_algorithm',
  description: 'Get the hash algorithm for a repository. Returns the hash algorithm used to store repository objects.',
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
    path: '/repos/{owner}/{repo}/hash-algorithm',
  },
});
