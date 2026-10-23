import { defineTool } from '@usemcpkit/core';

export const reposMerge = defineTool({
  name: 'repos:merge',
  description: 'Merge a branch',
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
      base: {
        type: 'string',
        description: 'The name of the base branch that the head will be merged into.',
      },
      head: {
        type: 'string',
        description: 'The head to merge. This can be a branch name or a commit SHA1.',
      },
      commit_message: {
        type: 'string',
        description: 'Commit message to use for the merge commit. If omitted, a default message will be used.',
      },
    },
    required: ['owner', 'repo', 'base', 'head'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/merges',
    body: ['base', 'head', 'commit_message'],
  },
});
