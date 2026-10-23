import { defineTool } from '@usemcpkit/core';

export const issuesResourceSubscriptionsCreateGroupsLabelsUnsubscribe = defineTool({
  name: 'issues:resource_subscriptions:create_groups_labels_unsubscribe',
  description:
    'Unsubscribe to a group label. Unsubscribes the currently authenticated user from a specified group label. They will no longer receive notifications on changes to this item.',
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
    path: '/groups/{id}/labels/{subscribable_id}/unsubscribe',
  },
});
