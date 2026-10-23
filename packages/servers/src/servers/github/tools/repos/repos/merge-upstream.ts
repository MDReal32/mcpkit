import { defineTool } from '@usemcpkit/core';

export const reposReposMergeUpstream = defineTool({
  name: 'repos:repos:merge_upstream',
  description:
    'Sync a fork branch with the upstream repository. Sync a branch of a forked repository to keep it up-to-date with the upstream repository.',
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
      branch: {
        type: 'string',
        description: 'The name of the branch which should be updated to match upstream.',
      },
    },
    required: ['owner', 'repo', 'branch'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/merge-upstream',
    body: ['branch'],
  },
});
