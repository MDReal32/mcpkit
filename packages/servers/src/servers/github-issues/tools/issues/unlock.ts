import { defineTool } from '@usemcpkit/core';

export const issuesUnlock = defineTool({
  name: 'issues:unlock',
  description: "Unlock an issue. Users with push access can unlock an issue's conversation.",
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
    },
    required: ['owner', 'repo', 'issue_number'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/issues/{issue_number}/lock',
  },
});
