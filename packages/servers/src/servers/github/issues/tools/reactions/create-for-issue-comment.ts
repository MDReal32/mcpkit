import { defineTool } from '@usemcpkit/core';

export const reactionsCreateForIssueComment = defineTool({
  name: 'reactions:create_for_issue_comment',
  description:
    'Create reaction for an issue comment. Create a reaction to an issue comment. A response with an HTTP `200` status means that you already added the reaction type to this issue comment.',
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
      content: {
        type: 'string',
        description: 'The reaction type to add to the issue comment.',
        enum: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray', 'rocket', 'eyes'],
      },
    },
    required: ['owner', 'repo', 'comment_id', 'content'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/issues/comments/{comment_id}/reactions',
    body: ['content'],
  },
});
