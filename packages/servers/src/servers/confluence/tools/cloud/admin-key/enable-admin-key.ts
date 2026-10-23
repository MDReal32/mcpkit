import { defineTool } from '@usemcpkit/core';

export const cloudAdminKeyEnableAdminKey = defineTool({
  name: 'cloud:admin_key:enable_admin_key',
  description:
    '[Cloud] Enable Admin Key. Enables admin key access for the calling user within the site. If an admin key already exists for the user, a new one will be issued with an updated expiration time.',
  input: {
    type: 'object',
    properties: {
      durationInMinutes: {
        type: 'integer',
        description:
          'The requested duration of admin key access in minutes, up to a maximum of 60 minutes, after which the issued admin key will automatically expire.',
      },
    },
  },
  request: {
    method: 'POST',
    path: '/wiki/api/v2/admin-key',
    body: ['durationInMinutes'],
  },
});
