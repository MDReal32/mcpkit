import { defineTool } from '@usemcpkit/core';

export const workflowsIssueResolutionsSearchResolutions = defineTool({
  name: 'workflows:issue_resolutions:search_resolutions',
  description:
    'Search resolutions. Returns a paginated list of resolutions. The list can contain all resolutions or a subset determined by any combination of these criteria:',
  input: {
    type: 'object',
    properties: {
      startAt: {
        type: 'string',
        default: '0',
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'string',
        default: '50',
        description: 'The maximum number of items to return per page.',
      },
      id: {
        type: 'string',
        description: 'The list of resolutions IDs to be filtered out (comma-separated)',
      },
      onlyDefault: {
        type: 'boolean',
        default: false,
        description:
          'When set to true, return default only, when IDs provided, if none of them is default, return empty page. Default value is false',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/resolution/search',
    query: ['startAt', 'maxResults', 'id', 'onlyDefault'],
  },
});
