import { defineTool } from '@usemcpkit/core';

export const reposReposDeleteCommitComment = defineTool({
  name: 'repos:repos:delete_commit_comment',
  description: 'Delete a commit comment',
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
      comment_id: {
        type: 'integer',
        description: 'The unique identifier of the comment.',
      },
    },
    required: ['owner', 'repo', 'comment_id'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/comments/{comment_id}',
  },
});
