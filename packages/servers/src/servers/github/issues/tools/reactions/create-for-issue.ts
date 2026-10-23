import { defineTool } from '@usemcpkit/core';

export const reactionsCreateForIssue = defineTool({
  name: 'reactions:create_for_issue',
  description:
    'Create reaction for an issue. Create a reaction to an issue. A response with an HTTP `200` status means that you already added the reaction type to this issue.',
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
      issue_number: {
        type: 'integer',
        description: 'The number that identifies the issue.',
      },
      content: {
        type: 'string',
        description: 'The reaction type to add to the issue.',
        enum: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray', 'rocket', 'eyes'],
      },
    },
    required: ['owner', 'repo', 'issue_number', 'content'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/issues/{issue_number}/reactions',
    body: ['content'],
  },
});
