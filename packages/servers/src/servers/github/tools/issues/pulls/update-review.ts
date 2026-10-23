import { defineTool } from '@usemcpkit/core';

export const issuesPullsUpdateReview = defineTool({
  name: 'issues:pulls:update_review',
  description: 'Update a review for a pull request. Updates the contents of a specified review summary comment.',
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
      body: {
        type: 'string',
        description: 'The body text of the pull request review.',
      },
    },
    required: ['owner', 'repo', 'pull_number', 'review_id', 'body'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}',
    body: ['body'],
  },
});
