import { defineTool } from '@usemcpkit/core';

export const pullsRerequestReviewers = defineTool({
  name: 'pulls:rerequest_reviewers',
  description:
    'Rerequest reviewers for a pull request. Rerequests reviews for a pull request from a given set of users and/or teams. This endpoint triggers notifications. Creating content too quickly using this endpoint may result in secondary rate limiting. For more information, see "Rate limits for the API" and "Best practices for using the REST API."',
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
      reviewers: {
        type: 'array',
        description: 'An array of user `login`s whose reviews will be rerequested.',
        items: {
          type: 'string',
        },
      },
      team_reviewers: {
        type: 'array',
        description: 'An array of team `slug`s whose reviews will be rerequested.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['owner', 'repo', 'pull_number'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers/rerequest',
    body: ['reviewers', 'team_reviewers'],
  },
});
