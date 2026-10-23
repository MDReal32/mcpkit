import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowStatusCategoriesGetStatusCategories = defineTool({
  name: 'workflows:workflow_status_categories:get_status_categories',
  description: 'Get all status categories. Returns a list of all status categories.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/statuscategory',
  },
});
