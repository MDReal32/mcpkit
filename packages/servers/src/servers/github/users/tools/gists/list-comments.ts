import { defineTool } from '@usemcpkit/core';

export const gistsListComments = defineTool({
  name: 'gists:list_comments',
  description: 'List gist comments. Lists the comments on a gist.',
  input: {
    type: 'object',
    properties: {
      gist_id: {
        type: 'string',
        description: 'The unique identifier of the gist.',
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
    required: ['gist_id'],
  },
  request: {
    method: 'GET',
    path: '/gists/{gist_id}/comments',
    query: ['per_page', 'page'],
  },
});
