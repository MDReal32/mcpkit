import { defineTool } from '@usemcpkit/core';

export const fieldsScreensUpdateScreen = defineTool({
  name: 'fields:screens:update_screen',
  description: 'Update screen. Updates a screen. Only screens used in classic projects can be updated.',
  input: {
    type: 'object',
    properties: {
      screenId: {
        type: 'integer',
        description: 'The ID of the screen.',
      },
      description: {
        type: 'string',
        description: 'The description of the screen. The maximum length is 255 characters.',
      },
      name: {
        type: 'string',
        description: 'The name of the screen. The name must be unique. The maximum length is 255 characters.',
      },
    },
    required: ['screenId'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/screens/{screenId}',
    body: ['description', 'name'],
  },
});
