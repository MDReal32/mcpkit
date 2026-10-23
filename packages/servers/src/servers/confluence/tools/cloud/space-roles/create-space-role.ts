import { defineTool } from '@usemcpkit/core';

export const cloudSpaceRolesCreateSpaceRole = defineTool({
  name: 'cloud:space_roles:create_space_role',
  description: '[Cloud] Create a space role. Create a space role.',
  input: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Name of the space role',
      },
      description: {
        type: 'string',
        description: 'Description for the space role',
      },
      spacePermissions: {
        type: 'array',
        description:
          'The ids of the space permissions associated with the space role. Sample value "read/space"; retrieve ids from responses returned by GET /space-permissions endpoint',
        items: {
          type: 'string',
        },
      },
    },
    required: ['name', 'description', 'spacePermissions'],
  },
  request: {
    method: 'POST',
    path: '/wiki/api/v2/space-roles',
    body: ['name', 'description', 'spacePermissions'],
  },
});
