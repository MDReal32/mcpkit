import { defineTool } from '@usemcpkit/core';

export const cloudV1UserGetGroupMembershipsForUser = defineTool({
  name: 'cloud_v1:user:get_group_memberships_for_user',
  description: '[Cloud v1] Get group memberships for user. Returns the groups that a user is a member of.',
  input: {
    type: 'object',
    properties: {
      accountId: {
        type: 'string',
        description:
          'The account ID of the user. The accountId uniquely identifies the user across all Atlassian products. For example, `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`.',
      },
      start: {
        type: 'integer',
        description: 'The starting index of the returned groups.',
      },
      limit: {
        type: 'integer',
        description:
          'The maximum number of groups to return per page. Note, this may be restricted by fixed system limits.',
      },
    },
    required: ['accountId'],
  },
  request: {
    method: 'GET',
    path: '/wiki/rest/api/user/memberof',
    query: ['accountId', 'start', 'limit'],
  },
});
