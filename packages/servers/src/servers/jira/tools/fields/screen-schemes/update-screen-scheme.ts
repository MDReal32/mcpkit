import { defineTool } from '@usemcpkit/core';

export const fieldsScreenSchemesUpdateScreenScheme = defineTool({
  name: 'fields:screen_schemes:update_screen_scheme',
  description:
    'Update screen scheme. Updates a screen scheme. Only screen schemes used in classic projects can be updated.',
  input: {
    type: 'object',
    properties: {
      screenSchemeId: {
        type: 'string',
        description: 'The ID of the screen scheme.',
      },
      description: {
        type: 'string',
        description: 'The description of the screen scheme. The maximum length is 255 characters.',
      },
      name: {
        type: 'string',
        description: 'The name of the screen scheme. The name must be unique. The maximum length is 255 characters.',
      },
      screens: {
        type: 'object',
        description:
          'The IDs of the screens for the screen types of the screen scheme. Only screens used in classic projects are accepted.',
        properties: {
          create: {
            type: 'string',
            description: 'The ID of the create screen. To remove the screen association, pass a null.',
          },
          default: {
            type: 'string',
            description:
              'The ID of the default screen. When specified, must include a screen ID as a default screen is required.',
          },
          edit: {
            type: 'string',
            description: 'The ID of the edit screen. To remove the screen association, pass a null.',
          },
          view: {
            type: 'string',
            description: 'The ID of the view screen. To remove the screen association, pass a null.',
          },
        },
      },
    },
    required: ['screenSchemeId'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/screenscheme/{screenSchemeId}',
    body: ['description', 'name', 'screens'],
  },
});
