import { defineTool } from '@usemcpkit/core';

export const cloudAdminKeyGetAdminKey = defineTool({
  name: 'cloud:admin_key:get_admin_key',
  description:
    '[Cloud] Get Admin Key. Returns information about the admin key if one is currently enabled for the calling user within the site.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/admin-key',
  },
});
