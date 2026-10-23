import { defineTool } from '@usemcpkit/core';

export const cloudV1GroupAddUserToGroupByGroupId = defineTool({
  name: 'cloud_v1:group:add_user_to_group_by_group_id',
  description:
    '[Cloud v1] Add member to group by groupId. Adds a user as a member in a group represented by its groupId',
  input: {
    type: 'object',
    properties: {
      groupId: {
        type: 'string',
        description: 'GroupId of the group whose membership is updated',
      },
      accountId: {
        type: 'string',
      },
    },
    required: ['groupId', 'accountId'],
  },
  request: {
    method: 'POST',
    path: '/wiki/rest/api/group/userByGroupId',
    query: ['groupId'],
    body: ['accountId'],
  },
});
