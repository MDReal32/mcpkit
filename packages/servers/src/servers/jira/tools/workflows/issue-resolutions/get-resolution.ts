import { defineTool } from '@usemcpkit/core';

export const workflowsIssueResolutionsGetResolution = defineTool({
  name: 'workflows:issue_resolutions:get_resolution',
  description: 'Get resolution. Returns an issue resolution value.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the issue resolution value.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/resolution/{id}',
  },
});
