import { defineTool } from '@usemcpkit/core';

export const datacenterPermissionsGetGroup = defineTool({
  name: 'datacenter:permissions:get_group',
  description:
    '[Data Center] Gets global permissions granted to a group. Returns list of permissions granted to group.',
  input: {
    type: 'object',
    properties: {
      groupName: {
        type: 'string',
        description: 'the name of the group to look up.',
      },
    },
    required: ['groupName'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/permissions/group/{groupName}',
  },
});
