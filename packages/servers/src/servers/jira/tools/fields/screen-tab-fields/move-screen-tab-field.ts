import { defineTool } from '@usemcpkit/core';

export const fieldsScreenTabFieldsMoveScreenTabField = defineTool({
  name: 'fields:screen_tab_fields:move_screen_tab_field',
  description: 'Move screen tab field. Moves a screen tab field.',
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
      after: {
        type: 'string',
        description:
          "The ID of the screen tab field after which to place the moved screen tab field. Required if `position` isn't provided.",
      },
      position: {
        type: 'string',
        description:
          "The named position to which the screen tab field should be moved. Required if `after` isn't provided.",
        enum: ['Earlier', 'Later', 'First', 'Last'],
      },
    },
    required: ['screenId', 'tabId', 'id'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/screens/{screenId}/tabs/{tabId}/fields/{id}/move',
    body: ['after', 'position'],
  },
});
