import { defineTool } from '@usemcpkit/core';

export const fieldsScreenTabsDeleteScreenTab = defineTool({
  name: 'fields:screen_tabs:delete_screen_tab',
  description: 'Delete screen tab. Deletes a screen tab.',
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
    },
    required: ['screenId', 'tabId'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/screens/{screenId}/tabs/{tabId}',
  },
});
