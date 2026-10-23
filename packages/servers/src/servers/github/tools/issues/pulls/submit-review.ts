import { defineTool } from '@usemcpkit/core';

export const issuesPullsSubmitReview = defineTool({
  name: 'issues:pulls:submit_review',
  description:
    'Submit a review for a pull request. Submits a pending review for a pull request. For more information about creating a pending review for a pull request, see "Create a review for a pull request."',
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
        description: 'The body text of the pull request review',
      },
      event: {
        type: 'string',
        description:
          'The review action you want to perform. The review actions include: `APPROVE`, `REQUEST_CHANGES`, or `COMMENT`. When you leave this blank, the API returns _HTTP 422 (Unrecognizable entity)_ and sets the review action state to `PENDING`, which means you will need to re-submit the pull request review using a review action.',
        enum: ['APPROVE', 'REQUEST_CHANGES', 'COMMENT'],
      },
    },
    required: ['owner', 'repo', 'pull_number', 'review_id', 'event'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events',
    body: ['body', 'event'],
  },
});
