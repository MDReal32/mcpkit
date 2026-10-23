import { defineTool } from '@usemcpkit/core';

export const projectsFreezePeriodsListProjectsFreezePeriods = defineTool({
  name: 'projects:freeze_periods:list_projects_freeze_periods',
  description: 'List all freeze periods. Lists all freeze periods for a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/freeze_periods',
    query: ['page', 'per_page'],
  },
});
