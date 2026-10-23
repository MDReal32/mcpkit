import { defineTool } from '@usemcpkit/core';

export const cloudPagesUpdatePageTitle = defineTool({
  name: 'cloud:pages:update_page_title',
  description: '[Cloud] Update page title. Updates the title of a specified page.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description:
          "The ID of the page to be updated. If you don't know the page ID, use Get Pages and filter the results",
      },
      status: {
        type: 'string',
        description: 'The status of the page, current or draft.',
        enum: ['current', 'draft'],
      },
      title: {
        type: 'string',
        description: 'The updated title for the page',
      },
    },
    required: ['id', 'status', 'title'],
  },
  request: {
    method: 'PUT',
    path: '/wiki/api/v2/pages/{id}/title',
    body: ['status', 'title'],
  },
});
