import { defineTool } from '@usemcpkit/core';

export const reposReposGetCommunityProfileMetrics = defineTool({
  name: 'repos:repos:get_community_profile_metrics',
  description:
    'Get community profile metrics. Returns all community profile metrics for a repository. The repository cannot be a fork.',
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
    path: '/repos/{owner}/{repo}/community/profile',
  },
});
