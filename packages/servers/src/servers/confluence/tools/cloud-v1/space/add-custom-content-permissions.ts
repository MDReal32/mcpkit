import { defineTool } from '@usemcpkit/core';

export const cloudV1SpaceAddCustomContentPermissions = defineTool({
  name: 'cloud_v1:space:add_custom_content_permissions',
  description: '[Cloud v1] Add new custom content permission to space. Adds new custom content permission to space.',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'The key of the space to be queried for its content.',
      },
      subject: {
        type: 'object',
        description: 'The user or group that the permission applies to.',
        properties: {
          type: {
            type: 'string',
            enum: ['user', 'group'],
          },
          identifier: {
            type: 'string',
            description: "for `type=user`, identifier should be user's accountId or `anonymous` for anonymous users",
          },
        },
        required: ['identifier', 'type'],
      },
      operations: {
        type: 'array',
        items: {
          type: 'object',
        },
      },
    },
    required: ['spaceKey', 'subject', 'operations'],
  },
  request: {
    method: 'POST',
    path: '/wiki/rest/api/space/{spaceKey}/permission/custom-content',
    body: ['subject', 'operations'],
  },
});
