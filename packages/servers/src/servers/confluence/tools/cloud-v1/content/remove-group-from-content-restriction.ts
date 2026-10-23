import { defineTool } from '@usemcpkit/core';

export const cloudV1ContentRemoveGroupFromContentRestriction = defineTool({
  name: 'cloud_v1:content:remove_group_from_content_restriction',
  description:
    '[Cloud v1] Remove group from content restriction. Removes a group from a content restriction. That is, remove read or update permission for the group for a piece of content.',
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
      groupId: {
        type: 'string',
        description: 'The id of the group to remove from the content restriction.',
      },
    },
    required: ['id', 'operationKey', 'groupId'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/rest/api/content/{id}/restriction/byOperation/{operationKey}/byGroupId/{groupId}',
  },
});
