import { defineTool } from '@usemcpkit/core';

export const reposReposGetCommitActivityStats = defineTool({
  name: 'repos:repos:get_commit_activity_stats',
  description:
    'Get the last year of commit activity. Returns the last year of commit activity grouped by week. The `days` array is a group of commits per day, starting on `Sunday`.',
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
    path: '/repos/{owner}/{repo}/stats/commit_activity',
  },
});
