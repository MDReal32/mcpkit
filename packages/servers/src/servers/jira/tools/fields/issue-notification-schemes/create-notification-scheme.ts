import { defineTool } from '@usemcpkit/core';

export const fieldsIssueNotificationSchemesCreateNotificationScheme = defineTool({
  name: 'fields:issue_notification_schemes:create_notification_scheme',
  description:
    'Create notification scheme. Creates a notification scheme with notifications. You can create up to 1000 notifications per request.',
  input: {
    type: 'object',
    properties: {
      description: {
        type: 'string',
        description: 'The description of the notification scheme.',
      },
      name: {
        type: 'string',
        description: 'The name of the notification scheme. Must be unique (case-insensitive).',
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
    required: ['name'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/notificationscheme',
    body: ['description', 'name', 'notificationSchemeEvents'],
  },
});
