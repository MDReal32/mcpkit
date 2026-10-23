import { defineTool } from '@usemcpkit/core';

export const issuesIssuesLock = defineTool({
  name: 'issues:issues:lock',
  description: "Lock an issue. Users with push access can lock an issue or pull request's conversation.",
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
      lock_reason: {
        type: 'string',
        description:
          "The reason for locking the issue or pull request conversation. Lock will fail if you don't use one of these reasons: * `off-topic` * `too heated` * `resolved` * `spam`",
        enum: ['off-topic', 'too heated', 'resolved', 'spam'],
      },
    },
    required: ['owner', 'repo', 'issue_number'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/issues/{issue_number}/lock',
    body: ['lock_reason'],
  },
});
