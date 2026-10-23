import { defineTool } from '@usemcpkit/core';

export const pullsDeletePendingReview = defineTool({
  name: 'pulls:delete_pending_review',
  description:
    'Delete a pending review for a pull request. Deletes a pull request review that has not been submitted. Submitted reviews cannot be deleted.',
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
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}',
  },
});
