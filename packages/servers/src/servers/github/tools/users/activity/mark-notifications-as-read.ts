import { defineTool } from '@usemcpkit/core';

export const usersActivityMarkNotificationsAsRead = defineTool({
  name: 'users:activity:mark_notifications_as_read',
  description:
    'Mark notifications as read. Marks all notifications as "read" for the current user. If the number of notifications is too large to complete in one request, you will receive a `202 Accepted` status and GitHub will run an asynchronous process to mark notifications as "read." To check whether any "unread" notifications remain, you can use the List notifications for the authenticated user endpoint and pass the query parameter `…',
  input: {
    type: 'object',
    properties: {
      last_read_at: {
        type: 'string',
        description:
          'Describes the last point that notifications were checked. Anything updated since this time will not be marked as read. If you omit this parameter, all notifications are marked as read. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`. Default: The current timestamp.',
      },
      read: {
        type: 'boolean',
        description: 'Whether the notification has been read.',
      },
    },
  },
  request: {
    method: 'PUT',
    path: '/notifications',
    body: ['last_read_at', 'read'],
  },
});
