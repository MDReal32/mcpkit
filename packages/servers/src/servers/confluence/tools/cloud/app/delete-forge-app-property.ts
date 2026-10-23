import { defineTool } from '@usemcpkit/core';

export const cloudAppDeleteForgeAppProperty = defineTool({
  name: 'cloud:app:delete_forge_app_property',
  description:
    '[Cloud] Deletes a Forge app property. Deletes a Forge app property. This API can only be accessed using asApp() requests from Forge.',
  input: {
    type: 'object',
    properties: {
      propertyKey: {
        type: 'string',
        description: 'The key of the property',
      },
    },
    required: ['propertyKey'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/api/v2/app/properties/{propertyKey}',
  },
});
