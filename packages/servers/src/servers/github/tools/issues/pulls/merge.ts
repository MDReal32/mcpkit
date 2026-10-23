import { defineTool } from '@usemcpkit/core';

export const issuesPullsMerge = defineTool({
  name: 'issues:pulls:merge',
  description:
    'Merge a pull request. > [!NOTE] > We recommend using the asynchronous merge API instead. This endpoint does not support stacked pull requests or merging with a merge queue.',
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
      pull_number: {
        type: 'integer',
        description: 'The number that identifies the pull request.',
      },
      commit_title: {
        type: 'string',
        description: 'Title for the automatic commit message.',
      },
      commit_message: {
        type: 'string',
        description: 'Extra detail to append to automatic commit message.',
      },
      sha: {
        type: 'string',
        description: 'SHA that pull request head must match to allow merge.',
      },
      merge_method: {
        type: 'string',
        description: 'The merge method to use.',
        enum: ['merge', 'squash', 'rebase'],
      },
    },
    required: ['owner', 'repo', 'pull_number'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/pulls/{pull_number}/merge',
    body: ['commit_title', 'commit_message', 'sha', 'merge_method'],
  },
});
