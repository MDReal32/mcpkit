import { defineTool } from '@usemcpkit/core';

export const usersActivityMarkThreadAsRead = defineTool({
  name: 'users:activity:mark_thread_as_read',
  description:
    'Mark a thread as read. Marks a thread as "read." Marking a thread as "read" is equivalent to clicking a notification in your notification inbox on GitHub: https://github.com/notifications.',
  input: {
    type: 'object',
    properties: {
      thread_id: {
        type: 'integer',
        description:
          'The unique identifier of the notification thread. This corresponds to the value returned in the `id` field when you retrieve notifications (for example with the `GET /notifications` operation).',
      },
    },
    required: ['thread_id'],
  },
  request: {
    method: 'PATCH',
    path: '/notifications/threads/{thread_id}',
  },
});
