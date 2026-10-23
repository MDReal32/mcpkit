import { defineTool } from '@usemcpkit/core';

export const fieldsScreenTabFieldsGetAllScreenTabFields = defineTool({
  name: 'fields:screen_tab_fields:get_all_screen_tab_fields',
  description: 'Get all screen tab fields. Returns all fields for a screen tab.',
  input: {
    type: 'object',
    properties: {
      screenId: {
        type: 'integer',
        description: 'The ID of the screen.',
      },
      tabId: {
        type: 'integer',
        description: 'The ID of the screen tab.',
      },
      projectKey: {
        type: 'string',
        description: 'The key of the project.',
      },
    },
    required: ['screenId', 'tabId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/screens/{screenId}/tabs/{tabId}/fields',
    query: ['projectKey'],
  },
});
