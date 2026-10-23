import { defineTool } from '@usemcpkit/core';

export const cloudV1ContentCheckContentPermission = defineTool({
  name: 'cloud_v1:content:check_content_permission',
  description:
    '[Cloud v1] Check content permissions. Check if a user or a group can perform an operation to the specified content. The `operation` to check must be provided. The user’s account ID or the ID of the group can be provided in the `subject` to check permissions against a specified user or group. The following permission checks are done to make sure that the user or group has the proper access:',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the content to check permissions against.',
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
      operation: {
        type: 'string',
        description: 'The content permission operation to check.',
        enum: ['read', 'update', 'delete'],
      },
    },
    required: ['id', 'subject', 'operation'],
  },
  request: {
    method: 'POST',
    path: '/wiki/rest/api/content/{id}/permission/check',
    body: ['subject', 'operation'],
  },
});
