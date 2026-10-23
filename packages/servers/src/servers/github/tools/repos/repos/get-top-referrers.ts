import { defineTool } from '@usemcpkit/core';

export const reposReposGetTopReferrers = defineTool({
  name: 'repos:repos:get_top_referrers',
  description: 'Get top referral sources. Get the top 10 referrers over the last 14 days.',
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
    path: '/repos/{owner}/{repo}/traffic/popular/referrers',
  },
});
