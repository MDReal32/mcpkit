import { defineTool } from '@usemcpkit/core';

export const collaborationWebhooksDeleteWebhookById = defineTool({
  name: 'collaboration:webhooks:delete_webhook_by_id',
  description:
    'Delete webhooks by ID. Removes webhooks by ID. Only webhooks registered by the calling app are removed. If webhooks created by other apps are specified, they are ignored.',
  input: {
    type: 'object',
    properties: {
      webhookIds: {
        type: 'array',
        description: 'A list of webhook IDs.',
        items: {
          type: 'integer',
          description: 'A list of webhook IDs.',
        },
      },
    },
    required: ['webhookIds'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/webhook',
    body: ['webhookIds'],
  },
});
