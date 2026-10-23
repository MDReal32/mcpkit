import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowStatusCategoriesGetStatusCategory = defineTool({
  name: 'workflows:workflow_status_categories:get_status_category',
  description:
    'Get status category. Returns a status category. Status categories provided a mechanism for categorizing statuses.',
  input: {
    type: 'object',
    properties: {
      idOrKey: {
        type: 'string',
        description: 'The ID or key of the status category.',
      },
    },
    required: ['idOrKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/statuscategory/{idOrKey}',
  },
});
