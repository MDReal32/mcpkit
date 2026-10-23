import { defineTool } from '@usemcpkit/core';

export const datacenterPermissionsGetAnonymous = defineTool({
  name: 'datacenter:permissions:get_anonymous',
  description:
    '[Data Center] Gets the permissions granted to an anonymous user. Returns list of permissions granted to anonymous user.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/permissions/anonymous',
  },
});
