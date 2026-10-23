import { defineTool } from '@usemcpkit/core';

export const issuesPullsMergeAsync = defineTool({
  name: 'issues:pulls:merge_async',
  description:
    'Merge a pull request asynchronously. Merges a pull request into the base branch in the background or adds it to a merge queue. Background processing allows certain types of errors to be retried and reduces the risk of timeouts for complex merges.',
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
        description: 'Title for the automatic commit message. Only supported for direct merges.',
      },
      commit_message: {
        type: 'string',
        description: 'Extra detail to append to automatic commit message. Only supported for direct merges.',
      },
      sha: {
        type: 'string',
        description:
          'SHA that pull request head must match to allow merge. If not provided, the current head of the PR at the time of the request will be used; if the PR is pushed in between the merge being requested and being executed, the merge will be cancelled.',
      },
      merge_method: {
        type: 'string',
        description: 'The merge method to use for a direct merge. Only supported for direct merges.',
        enum: ['merge', 'squash', 'rebase'],
      },
      merge_action: {
        type: 'string',
        description:
          'The action that will be taken to merge the pull request. `direct_merge` merges the pull request directly without using a merge queue; `merge_queue` adds the pull request to a merge queue; `default` uses a merge queue if one is configured for the target branch, or merges directly otherwise. If omitted, defaults to `default`.',
        enum: ['default', 'direct_merge', 'merge_queue'],
      },
      bypass_rules: {
        type: 'boolean',
        description: 'Whether to bypass repository rules that the authenticated actor is permitted to bypass.',
        default: false,
      },
    },
    required: ['owner', 'repo', 'pull_number'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/pulls/{pull_number}/merge-async',
    body: ['commit_title', 'commit_message', 'sha', 'merge_method', 'merge_action', 'bypass_rules'],
  },
});
