import { defineTool } from '@usemcpkit/core';

export const issuesPullsListReviewComments = defineTool({
  name: 'issues:pulls:list_review_comments',
  description:
    'List review comments on a pull request. Lists all review comments for a specified pull request. By default, review comments are in ascending order by ID.',
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
      sort: {
        type: 'string',
        default: 'created',
        enum: ['created', 'updated'],
        description: 'The property to sort the results by.',
      },
      direction: {
        type: 'string',
        enum: ['asc', 'desc'],
        description: 'The direction to sort results. Ignored without `sort` parameter.',
      },
      since: {
        type: 'string',
        description:
          'Only show results that were last updated after the given time. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['owner', 'repo', 'pull_number'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/pulls/{pull_number}/comments',
    query: ['sort', 'direction', 'since', 'per_page', 'page'],
  },
});
