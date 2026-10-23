import { defineTool } from '@usemcpkit/core';

export const issuesIssuesCreateComment = defineTool({
  name: 'issues:issues:create_comment',
  description:
    'Create an issue comment. You can use the REST API to create comments on issues and pull requests. Every pull request is an issue, but not every issue is a pull request.',
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
      body: {
        type: 'string',
        description: 'The contents of the comment.',
      },
    },
    required: ['owner', 'repo', 'issue_number', 'body'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/issues/{issue_number}/comments',
    body: ['body'],
  },
});
