import { defineTool } from '@usemcpkit/core';

export const cloudV1ContentRemoveUserFromContentRestriction = defineTool({
  name: 'cloud_v1:content:remove_user_from_content_restriction',
  description:
    '[Cloud v1] Remove user from content restriction. Removes a group from a content restriction. That is, remove read or update permission for the group for a piece of content.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the content that the restriction applies to.',
      },
      operationKey: {
        type: 'string',
        enum: ['read', 'update'],
        description: 'The operation that the restriction applies to.',
      },
      key: {
        type: 'string',
        description:
          'This parameter is no longer available and will be removed from the documentation soon. Use `accountId` instead. See the deprecation notice for details.',
      },
      username: {
        type: 'string',
        description:
          'This parameter is no longer available and will be removed from the documentation soon. Use `accountId` instead. See the deprecation notice for details.',
      },
      accountId: {
        type: 'string',
        description:
          'The account ID of the user. The accountId uniquely identifies the user across all Atlassian products. For example, `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`.',
      },
    },
    required: ['id', 'operationKey'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/rest/api/content/{id}/restriction/byOperation/{operationKey}/user',
    query: ['key', 'username', 'accountId'],
  },
});
