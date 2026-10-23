import { defineTool } from '@usemcpkit/core';

export const usersActivityDeleteThreadSubscription = defineTool({
  name: 'users:activity:delete_thread_subscription',
  description:
    'Delete a thread subscription. Mutes all future notifications for a conversation until you comment on the thread or get an **@mention**. If you are watching the repository of the thread, you will still receive notifications. To ignore future notifications for a repository you are watching, use the Set a thread subscription endpoint and set `ignore` to `true`.',
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
    method: 'DELETE',
    path: '/notifications/threads/{thread_id}/subscription',
  },
});
