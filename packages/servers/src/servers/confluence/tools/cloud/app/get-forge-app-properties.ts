import { defineTool } from '@usemcpkit/core';

export const cloudAppGetForgeAppProperties = defineTool({
  name: 'cloud:app:get_forge_app_properties',
  description:
    '[Cloud] Get Forge app properties. Gets Forge app properties. This API can only be accessed using asApp() requests from Forge.',
  input: {
    type: 'object',
    properties: {
      cursor: {
        type: 'string',
        description:
          'Used for pagination, this opaque cursor represents the last returned property key. It will be included in the response body as the next link. Use this key to request the next set of results.',
      },
      limit: {
        type: 'integer',
        description:
          'Maximum number of app properties per result to return. If more results exist, use the last returned property key from the Link field in the response body as a cursor to retrieve the next set of results.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/app/properties',
    query: ['cursor', 'limit'],
  },
});
