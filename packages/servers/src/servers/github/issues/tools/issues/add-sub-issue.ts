import { defineTool } from '@usemcpkit/core';

export const issuesAddSubIssue = defineTool({
  name: 'issues:add_sub_issue',
  description: 'Add sub-issue. You can use the REST API to add sub-issues to issues.',
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
        description:
          'The id of the sub-issue to add. The sub-issue must belong to the same repository owner as the parent issue',
      },
      replace_parent: {
        type: 'boolean',
        description: 'Option that, when true, instructs the operation to replace the sub-issues current parent issue',
      },
    },
    required: ['owner', 'repo', 'issue_number', 'sub_issue_id'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/issues/{issue_number}/sub_issues',
    body: ['sub_issue_id', 'replace_parent'],
  },
});
