import { defineTool } from '@usemcpkit/core';

export const fieldsScreenTabFieldsRemoveScreenTabField = defineTool({
  name: 'fields:screen_tab_fields:remove_screen_tab_field',
  description: 'Remove screen tab field. Removes a field from a screen tab.',
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
      id: {
        type: 'string',
        description: 'The ID of the field.',
      },
    },
    required: ['screenId', 'tabId', 'id'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/screens/{screenId}/tabs/{tabId}/fields/{id}',
  },
});
