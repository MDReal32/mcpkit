import { defineTool } from '@usemcpkit/core';

export const cloudSpacesGetSpaces = defineTool({
  name: 'cloud:spaces:get_spaces',
  description:
    '[Cloud] Get spaces. Returns all spaces. The results will be sorted by id ascending. The number of results is limited by the `limit` parameter and additional results (if available) will be available through the `next` URL present in the `Link` response header.',
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
      type: {
        type: 'string',
        enum: ['global', 'collaboration', 'knowledge_base', 'personal', 'system', 'onboarding', 'xflow_sample_space'],
        description: 'Filter the results to spaces based on their type.',
      },
      status: {
        type: 'string',
        enum: ['current', 'archived', 'trashed'],
        description: 'Filter the results to spaces based on their status.',
      },
      labels: {
        type: 'string',
        description:
          'Filter the results to spaces based on their labels. Multiple labels can be specified as a comma-separated list. (comma-separated)',
      },
      favorited_by: {
        type: 'string',
        description: 'Filter the results to spaces favorited by the user with the specified account ID.',
      },
      not_favorited_by: {
        type: 'string',
        description: 'Filter the results to spaces NOT favorited by the user with the specified account ID.',
      },
      sort: {
        type: 'string',
        description: 'Used to sort the result by a particular field.',
        enum: ['id', '-id', 'key', '-key', 'name', '-name'],
      },
      description_format: {
        type: 'string',
        description:
          'The content format type to be returned in the `description` field of the response. If available, the representation will be available under a response field of the same name under the `description` field.',
        enum: ['plain', 'view'],
      },
      include_icon: {
        type: 'boolean',
        description: 'If the icon for the space should be fetched or not.',
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
    path: '/wiki/api/v2/spaces',
    query: {
      ids: 'ids',
      keys: 'keys',
      type: 'type',
      status: 'status',
      labels: 'labels',
      'favorited-by': 'favorited_by',
      'not-favorited-by': 'not_favorited_by',
      sort: 'sort',
      'description-format': 'description_format',
      'include-icon': 'include_icon',
      cursor: 'cursor',
      limit: 'limit',
    },
  },
});
