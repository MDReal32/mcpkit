import { defineTool } from '@usemcpkit/core';

export const adminAnalyticsGetAnalyticsGroupActivityNewMembersCount = defineTool({
  name: 'admin:analytics:get_analytics_group_activity_new_members_count',
  description:
    'Retrieve count of members recently added to a group. Retrieves the count of members recently added to a specified group.',
  input: {
    type: 'object',
    properties: {
      group_path: {
        type: 'string',
        description: 'Group path.',
      },
    },
    required: ['group_path'],
  },
  request: {
    method: 'GET',
    path: '/analytics/group_activity/new_members_count',
    query: ['group_path'],
  },
});
