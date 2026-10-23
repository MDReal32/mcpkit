import { defineTool } from '@usemcpkit/core';

export const issuesResourceSubscriptionsCreateGroupsLabelsSubscribe = defineTool({
  name: 'issues:resource_subscriptions:create_groups_labels_subscribe',
  description:
    'Subscribe to a group label. Subscribes the currently authenticated user to a specified group label. They will receive notifications on changes to this item.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      subscribable_id: {
        type: 'string',
        description: 'Internal ID of the issue or merge request, or ID or title of the label.',
      },
    },
    required: ['id', 'subscribable_id'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/labels/{subscribable_id}/subscribe',
  },
});
