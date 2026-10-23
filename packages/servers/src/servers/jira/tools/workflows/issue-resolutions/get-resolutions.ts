import { defineTool } from '@usemcpkit/core';

export const workflowsIssueResolutionsGetResolutions = defineTool({
  name: 'workflows:issue_resolutions:get_resolutions',
  description: '[Deprecated] Get resolutions. Returns a list of all issue resolution values.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/resolution',
  },
});
