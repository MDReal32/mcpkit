import { defineTool } from '@usemcpkit/core';

export const issuesIssuesUpdateComment = defineTool({
  name: 'issues:issues:update_comment',
  description:
    'Update an issue comment. You can use the REST API to update comments on issues and pull requests. Every pull request is an issue, but not every issue is a pull request.',
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
        description: 'The contents of the comment.',
      },
    },
    required: ['owner', 'repo', 'comment_id', 'body'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/issues/comments/{comment_id}',
    body: ['body'],
  },
});
