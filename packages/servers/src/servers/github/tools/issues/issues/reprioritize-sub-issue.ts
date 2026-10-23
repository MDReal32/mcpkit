import { defineTool } from '@usemcpkit/core';

export const issuesIssuesReprioritizeSubIssue = defineTool({
  name: 'issues:issues:reprioritize_sub_issue',
  description:
    'Reprioritize sub-issue. You can use the REST API to reprioritize a sub-issue to a different position in the parent list.',
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
      sub_issue_id: {
        type: 'integer',
        description: 'The id of the sub-issue to reprioritize',
      },
      after_id: {
        type: 'integer',
        description:
          'The id of the sub-issue to be prioritized after (either positional argument after OR before should be specified).',
      },
      before_id: {
        type: 'integer',
        description:
          'The id of the sub-issue to be prioritized before (either positional argument after OR before should be specified).',
      },
    },
    required: ['owner', 'repo', 'issue_number', 'sub_issue_id'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/issues/{issue_number}/sub_issues/priority',
    body: ['sub_issue_id', 'after_id', 'before_id'],
  },
});
