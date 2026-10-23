import { defineTool } from '@usemcpkit/core';

export const metaUsageDataCreateUsageDataIncrementUniqueUsers = defineTool({
  name: 'meta:usage_data:create_usage_data_increment_unique_users',
  description:
    'Track usage data event for the current user. Tracks a unique-user event for the current user in Service Ping.',
  input: {
    type: 'object',
    properties: {
      event: {
        type: 'string',
        description: 'Event name that should be tracked.',
      },
    },
    required: ['event'],
  },
  request: {
    method: 'POST',
    path: '/usage_data/increment_unique_users',
    body: ['event'],
  },
});
