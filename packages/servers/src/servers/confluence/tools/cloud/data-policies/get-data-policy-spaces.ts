import { defineTool } from '@usemcpkit/core';

export const cloudDataPoliciesGetDataPolicySpaces = defineTool({
  name: 'cloud:data_policies:get_data_policy_spaces',
  description:
    '[Cloud] Get spaces with data policies. Returns all spaces. The results will be sorted by id ascending. The number of results is limited by the `limit` parameter and additional results (if available) will be available through the `next` URL present in the `Link` response header.',
  input: {
    type: 'object',
    properties: {
      ids: {
        type: 'string',
        description:
          'Filter the results to spaces based on their IDs. Multiple IDs can be specified as a comma-separated list. (comma-separated)',
      },
      keys: {
        type: 'string',
        description:
          'Filter the results to spaces based on their keys. Multiple keys can be specified as a comma-separated list. (comma-separated)',
      },
      sort: {
        type: 'string',
        description: 'Used to sort the result by a particular field.',
        enum: ['id', '-id', 'key', '-key', 'name', '-name'],
      },
      cursor: {
        type: 'string',
        description:
          'Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the relative URL in the `Link` header to retrieve the `next` set of results.',
      },
      limit: {
        type: 'integer',
        description:
          'Maximum number of spaces per result to return. If more results exist, use the `Link` response header to retrieve a relative URL that will return the next set of results.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/data-policies/spaces',
    query: ['ids', 'keys', 'sort', 'cursor', 'limit'],
  },
});
