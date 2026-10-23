import { defineTool } from '@usemcpkit/core';

export const issuesIssuesRemoveAssignees = defineTool({
  name: 'issues:issues:remove_assignees',
  description: 'Remove assignees from an issue. Removes one or more assignees from an issue.',
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
      assignees: {
        type: 'array',
        description:
          'Usernames of assignees to remove from an issue. _NOTE: Only users with push access can remove assignees from an issue. Assignees are silently ignored otherwise._',
        items: {
          type: 'string',
        },
      },
    },
    required: ['owner', 'repo', 'issue_number'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/issues/{issue_number}/assignees',
    body: ['assignees'],
  },
});
