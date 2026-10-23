import { defineTool } from '@usemcpkit/core';

export const cloudV1GroupCreateGroup = defineTool({
  name: 'cloud_v1:group:create_group',
  description: '[Cloud v1] Create new user group. Creates a new user group.',
  input: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
    },
    required: ['name'],
  },
  request: {
    method: 'POST',
    path: '/wiki/rest/api/group',
    body: ['name'],
  },
});
