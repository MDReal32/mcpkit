import { defineTool } from '@usemcpkit/core';

export const usersSearchCommits = defineTool({
  name: 'users:search:commits',
  description:
    'Search commits. Find commits via various criteria on the default branch (usually `main`). This method returns up to 100 results per page.',
  input: {
    type: 'object',
    properties: {
      q: {
        type: 'string',
        description:
          'The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see Constructing a search query. See "Searching commits" for a detailed list of qualifiers.',
      },
      sort: {
        type: 'string',
        enum: ['author-date', 'committer-date'],
        description: 'Sorts the results of your query by `author-date` or `committer-date`. Default: best match',
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
    required: ['q'],
  },
  request: {
    method: 'GET',
    path: '/search/commits',
    query: ['q', 'sort', 'order', 'per_page', 'page'],
  },
});
