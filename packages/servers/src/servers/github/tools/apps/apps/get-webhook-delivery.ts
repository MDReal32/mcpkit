import { defineTool } from '@usemcpkit/core';

export const appsAppsGetWebhookDelivery = defineTool({
  name: 'apps:apps:get_webhook_delivery',
  description: 'Get a delivery for an app webhook. Returns a delivery for the webhook configured for a GitHub App.',
  input: {
    type: 'object',
    properties: {
      delivery_id: {
        type: 'integer',
      },
    },
    required: ['delivery_id'],
  },
  request: {
    method: 'GET',
    path: '/app/hook/deliveries/{delivery_id}',
  },
});
