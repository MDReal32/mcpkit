import { defineTool } from '@usemcpkit/core';

export const cloudV1ContentGetIndividualGroupRestrictionStatusByGroupId = defineTool({
  name: 'cloud_v1:content:get_individual_group_restriction_status_by_group_id',
  description:
    '[Cloud v1] Get content restriction status for group. Returns whether the specified content restriction applies to a group. For example, if a page with `id=123` has a `read` restriction for the `123456` group id, the following request will return `true`:',
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
        description: 'The id of the group to be queried for whether the content restriction applies to it.',
      },
    },
    required: ['id', 'operationKey', 'groupId'],
  },
  request: {
    method: 'GET',
    path: '/wiki/rest/api/content/{id}/restriction/byOperation/{operationKey}/byGroupId/{groupId}',
  },
});
