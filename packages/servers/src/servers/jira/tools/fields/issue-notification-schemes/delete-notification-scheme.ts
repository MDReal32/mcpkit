import { defineTool } from '@usemcpkit/core';

export const fieldsIssueNotificationSchemesDeleteNotificationScheme = defineTool({
  name: 'fields:issue_notification_schemes:delete_notification_scheme',
  description: 'Delete notification scheme. Deletes a notification scheme.',
  input: {
    type: 'object',
    properties: {
      notificationSchemeId: {
        type: 'string',
        description: 'The ID of the notification scheme.',
      },
    },
    required: ['notificationSchemeId'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/notificationscheme/{notificationSchemeId}',
  },
});
