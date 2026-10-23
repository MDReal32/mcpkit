import { defineTool } from '@usemcpkit/core';

export const fieldsScreensAddFieldToDefaultScreen = defineTool({
  name: 'fields:screens:add_field_to_default_screen',
  description: 'Add field to default screen. Adds a field to the default tab of the default screen.',
  input: {
    type: 'object',
    properties: {
      fieldId: {
        type: 'string',
        description: 'The ID of the field.',
      },
    },
    required: ['fieldId'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/screens/addToDefault/{fieldId}',
  },
});
