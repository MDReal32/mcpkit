import { defineTool } from '@usemcpkit/core';

export const issuesPinComment = defineTool({
  name: 'issues:pin_comment',
  description: 'Pin an issue comment. You can use the REST API to pin comments on issues.',
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
    method: 'PUT',
    path: '/repos/{owner}/{repo}/issues/comments/{comment_id}/pin',
  },
});
