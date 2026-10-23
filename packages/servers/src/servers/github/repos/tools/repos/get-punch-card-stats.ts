import { defineTool } from '@usemcpkit/core';

export const reposGetPunchCardStats = defineTool({
  name: 'repos:get_punch_card_stats',
  description:
    'Get the hourly commit count for each day. Each array contains the day number, hour number, and number of commits:',
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
    path: '/repos/{owner}/{repo}/stats/punch_card',
  },
});
