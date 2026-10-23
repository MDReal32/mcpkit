import { defineTool } from '@usemcpkit/core';

export const issuesIssuesAddBlockedByDependency = defineTool({
  name: 'issues:issues:add_blocked_by_dependency',
  description:
    "Add a dependency an issue is blocked by. You can use the REST API to add a 'blocked by' relationship to an issue.",
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
      issue_id: {
        type: 'integer',
        description: 'The id of the issue that blocks the current issue',
      },
    },
    required: ['owner', 'repo', 'issue_number', 'issue_id'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by',
    body: ['issue_id'],
  },
});
