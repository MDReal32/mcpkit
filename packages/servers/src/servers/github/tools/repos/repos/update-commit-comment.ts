import { defineTool } from '@usemcpkit/core';

export const reposReposUpdateCommitComment = defineTool({
  name: 'repos:repos:update_commit_comment',
  description: 'Update a commit comment. Updates the contents of a specified commit comment.',
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
      body: {
        type: 'string',
        description: 'The contents of the comment',
      },
    },
    required: ['owner', 'repo', 'comment_id', 'body'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/comments/{comment_id}',
    body: ['body'],
  },
});
