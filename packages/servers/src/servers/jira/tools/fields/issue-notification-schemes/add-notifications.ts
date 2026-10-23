import { defineTool } from '@usemcpkit/core';

export const fieldsIssueNotificationSchemesAddNotifications = defineTool({
  name: 'fields:issue_notification_schemes:add_notifications',
  description:
    'Add notifications to notification scheme. Adds notifications to a notification scheme. You can add up to 1000 notifications per request.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the notification scheme.',
      },
      notificationSchemeEvents: {
        type: 'array',
        description: 'The list of notifications which should be added to the notification scheme.',
        items: {
          type: 'object',
          description: 'Details of a notification scheme event.',
          properties: {
            event: {
              type: 'object',
              description: 'The ID of the event.',
            },
            notifications: {
              type: 'array',
              description: 'The list of notifications mapped to a specified event.',
              items: {
                type: 'object',
                description: 'Details of a notification within a notification scheme.',
              },
            },
          },
          required: ['event', 'notifications'],
        },
      },
    },
    required: ['id', 'notificationSchemeEvents'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/notificationscheme/{id}/notification',
    body: ['notificationSchemeEvents'],
  },
});
