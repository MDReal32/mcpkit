import { defineTool } from '@usemcpkit/core';

export const workflowsStatusGetStatusesById = defineTool({
  name: 'workflows:status:get_statuses_by_id',
  description: 'Bulk get statuses. Returns a list of the statuses specified by one or more status IDs.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description:
          'The list of status IDs. To include multiple IDs, provide an ampersand-separated list. For example, id=10000&id=10001. (comma-separated)',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/statuses',
    query: ['id'],
  },
});
