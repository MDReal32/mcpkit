import { defineTool } from '@usemcpkit/core';

export const searchTopics = defineTool({
  name: 'search:topics',
  description:
    'Search topics. Find topics via various criteria. Results are sorted by best match. This method returns up to 100 results per page. See "Searching topics" for a detailed list of qualifiers.',
  input: {
    type: 'object',
    properties: {
      q: {
        type: 'string',
        description:
          'The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see Constructing a search query.',
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
    path: '/search/topics',
    query: ['q', 'per_page', 'page'],
  },
});
