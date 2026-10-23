import { defineTool } from '@usemcpkit/core';

export const fieldsScreensCreateScreen = defineTool({
  name: 'fields:screens:create_screen',
  description: 'Create screen. Creates a screen with a default field tab.',
  input: {
    type: 'object',
    properties: {
      description: {
        type: 'string',
        description: 'The description of the screen. The maximum length is 255 characters.',
      },
      name: {
        type: 'string',
        description: 'The name of the screen. The name must be unique. The maximum length is 255 characters.',
      },
    },
    required: ['name'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/screens',
    body: ['description', 'name'],
  },
});
