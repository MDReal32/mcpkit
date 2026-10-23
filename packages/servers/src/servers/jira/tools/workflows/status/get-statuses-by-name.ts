import { defineTool } from '@usemcpkit/core';

export const workflowsStatusGetStatusesByName = defineTool({
  name: 'workflows:status:get_statuses_by_name',
  description: 'Bulk get statuses by name. Returns a list of the statuses specified by one or more status names.',
  input: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description:
          'The list of status names. To include multiple names, provide an ampersand-separated list. For example, name=nameXX&name=nameYY. (comma-separated)',
      },
      projectId: {
        type: 'string',
        description: 'The project the status is part of or null for global statuses.',
      },
    },
    required: ['name'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/statuses/byNames',
    query: ['name', 'projectId'],
  },
});
