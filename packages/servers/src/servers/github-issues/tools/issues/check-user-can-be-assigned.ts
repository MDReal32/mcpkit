import { defineTool } from '@usemcpkit/core';

export const issuesCheckUserCanBeAssigned = defineTool({
  name: 'issues:check_user_can_be_assigned',
  description:
    'Check if a user can be assigned. Checks if a user has permission to be assigned to an issue in this repository.',
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
      assignee: {
        type: 'string',
      },
    },
    required: ['owner', 'repo', 'assignee'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/assignees/{assignee}',
  },
});
