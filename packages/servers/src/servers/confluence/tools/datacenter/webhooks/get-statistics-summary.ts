import { defineTool } from '@usemcpkit/core';

export const datacenterWebhooksGetStatisticsSummary = defineTool({
  name: 'datacenter:webhooks:get_statistics_summary',
  description:
    '[Data Center] Get statistics summary. Get the statistics summary for a specific webhook. The authenticated user must be an administrator to call this resource.',
  input: {
    type: 'object',
    properties: {
      webhookId: {
        type: 'integer',
        description: 'id of the webhook',
      },
    },
    required: ['webhookId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/webhooks/{webhookId}/statistics/summary',
  },
});
