import { defineTool } from '@usemcpkit/core';

export const fieldsScreensGetAvailableScreenFields = defineTool({
  name: 'fields:screens:get_available_screen_fields',
  description: 'Get available screen fields. Returns the fields that can be added to a tab on a screen.',
  input: {
    type: 'object',
    properties: {
      screenId: {
        type: 'integer',
        description: 'The ID of the screen.',
      },
    },
    required: ['screenId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/screens/{screenId}/availableFields',
  },
});
