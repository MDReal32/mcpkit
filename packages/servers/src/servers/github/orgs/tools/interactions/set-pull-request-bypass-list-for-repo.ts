import { defineTool } from '@usemcpkit/core';

export const interactionsSetPullRequestBypassListForRepo = defineTool({
  name: 'interactions:set_pull_request_bypass_list_for_repo',
  description:
    'Add users to the pull request creation cap bypass list for a repository. Adds users to the pull request creation cap bypass list for a repository. Users on this list can create pull requests regardless of any configured pull request creation cap.',
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
      users: {
        type: 'array',
        description: 'A list of user logins to add or remove from the bypass list.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['owner', 'repo', 'users'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/interaction-limits/pulls/bypass-list',
    body: ['users'],
  },
});
