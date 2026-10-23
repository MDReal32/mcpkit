import { defineTool } from '@usemcpkit/core';

export const reposReposGetTopPaths = defineTool({
  name: 'repos:repos:get_top_paths',
  description: 'Get top referral paths. Get the top 10 popular contents over the last 14 days.',
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
    path: '/repos/{owner}/{repo}/traffic/popular/paths',
  },
});
