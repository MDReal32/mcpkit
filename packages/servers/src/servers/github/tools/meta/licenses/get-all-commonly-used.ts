import { defineTool } from '@usemcpkit/core';

export const metaLicensesGetAllCommonlyUsed = defineTool({
  name: 'meta:licenses:get_all_commonly_used',
  description:
    'Get all commonly used licenses. Lists the most commonly used licenses on GitHub. For more information, see "Licensing a repository ."',
  input: {
    type: 'object',
    properties: {
      featured: {
        type: 'boolean',
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
  },
  request: {
    method: 'GET',
    path: '/licenses',
    query: ['featured', 'per_page', 'page'],
  },
});
