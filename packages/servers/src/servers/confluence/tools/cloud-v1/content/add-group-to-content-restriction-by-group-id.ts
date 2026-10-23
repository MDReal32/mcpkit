import { defineTool } from '@usemcpkit/core';

export const cloudV1ContentAddGroupToContentRestrictionByGroupId = defineTool({
  name: 'cloud_v1:content:add_group_to_content_restriction_by_group_id',
  description:
    '[Cloud v1] Add group to content restriction. Adds a group to a content restriction by Group Id. That is, grant read or update permission to the group for a piece of content.',
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
        description: 'The groupId of the group to add to the content restriction.',
      },
    },
    required: ['id', 'operationKey', 'groupId'],
  },
  request: {
    method: 'PUT',
    path: '/wiki/rest/api/content/{id}/restriction/byOperation/{operationKey}/byGroupId/{groupId}',
  },
});
