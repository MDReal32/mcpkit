import { defineTool } from '@usemcpkit/core';

export const activityGetThread = defineTool({
  name: 'activity:get_thread',
  description: 'Get a thread. Gets information about a notification thread.',
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
    method: 'GET',
    path: '/notifications/threads/{thread_id}',
  },
});
