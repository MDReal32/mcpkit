import { defineTool } from '@usemcpkit/core';

export const datacenterSpaceGetPermissionsUser = defineTool({
  name: 'datacenter:space:get_permissions_user',
  description:
    '[Data Center] Gets the permissions granted to a user in a space. Returns list of permissions granted to user in the particular space.',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
      },
      userKey: {
        type: 'string',
      },
    },
    required: ['spaceKey', 'userKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/space/{spaceKey}/permissions/user/{userKey}',
  },
});
