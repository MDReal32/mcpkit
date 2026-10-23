import { defineTool } from '@usemcpkit/core';

export const datacenterPermissionsList = defineTool({
  name: 'datacenter:permissions:list',
  description: '[Data Center] Get global permissions. Returns list of permissions granted to users and groups.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/permissions',
  },
});
