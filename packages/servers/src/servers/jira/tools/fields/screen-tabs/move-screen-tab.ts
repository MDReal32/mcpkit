import { defineTool } from '@usemcpkit/core';

export const fieldsScreenTabsMoveScreenTab = defineTool({
  name: 'fields:screen_tabs:move_screen_tab',
  description: 'Move screen tab. Moves a screen tab.',
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
      pos: {
        type: 'integer',
        description: 'The position of tab. The base index is 0.',
      },
    },
    required: ['screenId', 'tabId', 'pos'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/screens/{screenId}/tabs/{tabId}/move/{pos}',
  },
});
