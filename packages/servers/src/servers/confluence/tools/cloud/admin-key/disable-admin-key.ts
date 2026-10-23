import { defineTool } from '@usemcpkit/core';

export const cloudAdminKeyDisableAdminKey = defineTool({
  name: 'cloud:admin_key:disable_admin_key',
  description: '[Cloud] Disable Admin Key. Disables admin key access for the calling user within the site.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'DELETE',
    path: '/wiki/api/v2/admin-key',
  },
});
