import { defineTool } from '@usemcpkit/core';

export const pullsListRequestedReviewers = defineTool({
  name: 'pulls:list_requested_reviewers',
  description:
    'Get all requested reviewers for a pull request. Gets the users or teams whose review is requested for a pull request. Once a requested reviewer submits a review, they are no longer considered a requested reviewer. Their review will instead be returned by the List reviews for a pull request operation.',
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
      pull_number: {
        type: 'integer',
        description: 'The number that identifies the pull request.',
      },
    },
    required: ['owner', 'repo', 'pull_number'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers',
  },
});
