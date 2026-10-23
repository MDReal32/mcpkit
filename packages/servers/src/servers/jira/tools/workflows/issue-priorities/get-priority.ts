import { defineTool } from '@usemcpkit/core';

export const workflowsIssuePrioritiesGetPriority = defineTool({
  name: 'workflows:issue_priorities:get_priority',
  description:
    'Get priority. Returns an issue priority. To fetch multiple priorities at once, use Search priorities instead.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the issue priority.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/priority/{id}',
  },
});
