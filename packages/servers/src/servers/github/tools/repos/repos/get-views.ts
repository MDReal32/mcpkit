import { defineTool } from '@usemcpkit/core';

export const reposReposGetViews = defineTool({
  name: 'repos:repos:get_views',
  description:
    'Get page views. Get the total number of views and breakdown per day or week for the last 14 days. Timestamps are aligned to UTC midnight of the beginning of the day or week. Week begins on Monday.',
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
      per: {
        type: 'string',
        default: 'day',
        enum: ['day', 'week'],
        description: 'The time frame to display results for.',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/traffic/views',
    query: ['per'],
  },
});
