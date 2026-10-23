import { defineTool } from '@usemcpkit/core';

export const workflowsStatusSearch = defineTool({
  name: 'workflows:status:search',
  description:
    'Search statuses paginated. Returns a paginated list of statuses that match a search on name or project.',
  input: {
    type: 'object',
    properties: {
      projectId: {
        type: 'string',
        description: 'The project the status is part of or null for global statuses.',
      },
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'integer',
        default: 200,
        description: 'The maximum number of items to return per page.',
      },
      searchString: {
        type: 'string',
        description: 'Term to match status names against or null to search for all statuses in the search scope.',
      },
      statusCategory: {
        type: 'string',
        description:
          'Category of the status to filter by. The supported values are: `TODO`, `IN_PROGRESS`, and `DONE`.',
      },
      includeGlobalStatuses: {
        type: 'boolean',
        description:
          'Whether to include global statuses (scope = null, not tied to any project) in the response. Defaults to false. Only relevant for project scoped queries.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/statuses/search',
    query: ['projectId', 'startAt', 'maxResults', 'searchString', 'statusCategory', 'includeGlobalStatuses'],
  },
});
