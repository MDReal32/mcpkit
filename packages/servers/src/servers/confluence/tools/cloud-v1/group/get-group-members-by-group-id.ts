import { defineTool } from '@usemcpkit/core';

export const cloudV1GroupGetGroupMembersByGroupId = defineTool({
  name: 'cloud_v1:group:get_group_members_by_group_id',
  description: '[Cloud v1] Get group members. Returns the users that are members of a group.',
  input: {
    type: 'object',
    properties: {
      groupId: {
        type: 'string',
        description: 'The id of the group to be queried for its members.',
      },
      start: {
        type: 'integer',
        description: 'The starting index of the returned users.',
      },
      limit: {
        type: 'integer',
        description:
          'The maximum number of users to return per page. Note, this may be restricted by fixed system limits.',
      },
      shouldReturnTotalSize: {
        type: 'boolean',
        description:
          'Whether to include total size parameter in the results. Note, fetching total size property is an expensive operation; use it if your use case needs this value.',
      },
      expand: {
        type: 'string',
        description: 'A multi-value parameter indicating which properties of the user to expand. (comma-separated)',
      },
    },
    required: ['groupId'],
  },
  request: {
    method: 'GET',
    path: '/wiki/rest/api/group/{groupId}/membersByGroupId',
    query: ['start', 'limit', 'shouldReturnTotalSize', 'expand'],
  },
});
