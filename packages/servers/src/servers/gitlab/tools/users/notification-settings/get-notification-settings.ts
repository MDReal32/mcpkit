import { defineTool } from '@usemcpkit/core';

export const usersNotificationSettingsGetNotificationSettings = defineTool({
  name: 'users:notification_settings:get_notification_settings',
  description: 'Retrieve global notification settings. Retrieves the global notification level and email address.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/notification_settings',
  },
});
