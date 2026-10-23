import { defineTool } from '@usemcpkit/core';

export const usersMobilePushSubscriptionsDeleteUserPushSubscriptions = defineTool({
  name: 'users:mobile_push_subscriptions:delete_user_push_subscriptions',
  description:
    "Unregister a mobile device from push notifications. Removes the calling user's push subscriptions for the given device token.",
  input: {
    type: 'object',
    properties: {
      device_token: {
        type: 'string',
        description: 'The hexadecimal APNs device token',
      },
    },
    required: ['device_token'],
  },
  request: {
    method: 'DELETE',
    path: '/user/push_subscriptions',
    query: ['device_token'],
  },
});
