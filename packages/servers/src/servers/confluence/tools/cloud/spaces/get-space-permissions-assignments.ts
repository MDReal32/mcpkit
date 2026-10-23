import { defineTool } from '@usemcpkit/core';

export const cloudSpacesGetSpacePermissionsAssignments = defineTool({
  name: 'cloud:spaces:get_space_permissions_assignments',
  description: '[Cloud] Get space permissions assignments. Returns space permission assignments for a specific space.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the space to be returned.',
      },
      cursor: {
        type: 'string',
        description:
          'Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the relative URL in the `Link` header to retrieve the `next` set of results.',
      },
      limit: {
        type: 'integer',
        description:
          'Maximum number of assignments to return. If more results exist, use the `Link` response header to retrieve a relative URL that will return the next set of results.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/spaces/{id}/permissions',
    query: ['cursor', 'limit'],
  },
});
