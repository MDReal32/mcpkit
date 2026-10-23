import { defineTool } from '@usemcpkit/core';

export const usersActivityGetThreadSubscriptionForAuthenticatedUser = defineTool({
  name: 'users:activity:get_thread_subscription_for_authenticated_user',
  description:
    'Get a thread subscription for the authenticated user. This checks to see if the current user is subscribed to a thread. You can also get a repository subscription.',
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
    path: '/notifications/threads/{thread_id}/subscription',
  },
});
