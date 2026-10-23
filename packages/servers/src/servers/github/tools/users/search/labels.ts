import { defineTool } from '@usemcpkit/core';

export const usersSearchLabels = defineTool({
  name: 'users:search:labels',
  description:
    'Search labels. Find labels in a repository with names or descriptions that match search keywords. Returns up to 100 results per page.',
  input: {
    type: 'object',
    properties: {
      repository_id: {
        type: 'integer',
        description: 'The id of the repository.',
      },
      q: {
        type: 'string',
        description:
          'The search keywords. This endpoint does not accept qualifiers in the query. To learn more about the format of the query, see Constructing a search query.',
      },
      sort: {
        type: 'string',
        enum: ['created', 'updated'],
        description:
          'Sorts the results of your query by when the label was `created` or `updated`. Default: best match',
      },
      order: {
        type: 'string',
        default: 'desc',
        enum: ['desc', 'asc'],
        description:
          'Determines whether the first search result returned is the highest number of matches (`desc`) or lowest number of matches (`asc`). This parameter is ignored unless you provide `sort`.',
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
    required: ['repository_id', 'q'],
  },
  request: {
    method: 'GET',
    path: '/search/labels',
    query: ['repository_id', 'q', 'sort', 'order', 'per_page', 'page'],
  },
});
