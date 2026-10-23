import { defineTool } from '@usemcpkit/core';

export const issuesPullsListReviewCommentsForRepo = defineTool({
  name: 'issues:pulls:list_review_comments_for_repo',
  description:
    'List review comments in a repository. Lists review comments for all pull requests in a repository. By default, review comments are in ascending order by ID.',
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
      sort: {
        type: 'string',
        enum: ['created', 'updated', 'created_at'],
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
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/pulls/comments',
    query: ['sort', 'direction', 'since', 'per_page', 'page'],
  },
});
