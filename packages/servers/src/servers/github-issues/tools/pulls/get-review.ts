import { defineTool } from '@usemcpkit/core';

export const pullsGetReview = defineTool({
  name: 'pulls:get_review',
  description: 'Get a review for a pull request. Retrieves a pull request review by its ID.',
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
      review_id: {
        type: 'integer',
        description: 'The unique identifier of the review.',
      },
    },
    required: ['owner', 'repo', 'pull_number', 'review_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}',
  },
});
