import { defineTool } from '@usemcpkit/core';

export const fieldsScreenTabsGetAllScreenTabs = defineTool({
  name: 'fields:screen_tabs:get_all_screen_tabs',
  description: 'Get all screen tabs. Returns the list of tabs for a screen.',
  input: {
    type: 'object',
    properties: {
      screenId: {
        type: 'integer',
        description: 'The ID of the screen.',
      },
      projectKey: {
        type: 'string',
        description: 'The key of the project.',
      },
    },
    required: ['screenId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/screens/{screenId}/tabs',
    query: ['projectKey'],
  },
});
