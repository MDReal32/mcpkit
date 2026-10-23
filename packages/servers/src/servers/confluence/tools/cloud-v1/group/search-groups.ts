import { defineTool } from '@usemcpkit/core';

export const cloudV1GroupSearchGroups = defineTool({
  name: 'cloud_v1:group:search_groups',
  description: '[Cloud v1] Search groups by partial query. Get search results of groups by partial query provided.',
  input: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'the search term used to query results.',
      },
      start: {
        type: 'integer',
        description: 'The starting index of the returned groups.',
      },
      limit: {
        type: 'integer',
        description:
          'The maximum number of groups to return per page. Note, this is restricted to a maximum limit of 200 groups.',
      },
      shouldReturnTotalSize: {
        type: 'boolean',
        description:
          'Whether to include total size parameter in the results. Note, fetching total size property is an expensive operation; use it if your use case needs this value.',
      },
    },
    required: ['query'],
  },
  request: {
    method: 'GET',
    path: '/wiki/rest/api/group/picker',
    query: ['query', 'start', 'limit', 'shouldReturnTotalSize'],
  },
});
