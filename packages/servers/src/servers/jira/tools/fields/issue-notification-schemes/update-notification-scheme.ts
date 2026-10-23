import { defineTool } from '@usemcpkit/core';

export const fieldsIssueNotificationSchemesUpdateNotificationScheme = defineTool({
  name: 'fields:issue_notification_schemes:update_notification_scheme',
  description: 'Update notification scheme. Updates a notification scheme.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the notification scheme.',
      },
      description: {
        type: 'string',
        description: 'The description of the notification scheme.',
      },
      name: {
        type: 'string',
        description: 'The name of the notification scheme. Must be unique.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/notificationscheme/{id}',
    body: ['description', 'name'],
  },
});
