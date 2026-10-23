import { defineTool } from '@usemcpkit/core';

export const datacenterWebhooksGetLatest = defineTool({
  name: 'datacenter:webhooks:get_latest',
  description:
    '[Data Center] Get latest invocations. Get the latest invocations for a specific webhook. The authenticated user must be an administrator to call this resource.',
  input: {
    type: 'object',
    properties: {
      webhookId: {
        type: 'integer',
        description: 'id of the webhook',
      },
      outcomes: {
        type: 'string',
        description:
          'the outcome to filter for. Can be SUCCESS, FAILURE, ERROR. None specified means that the all will be considered.',
      },
      event: {
        type: 'string',
        description: 'the string id of a specific event to retrieve the last invocation for.',
      },
      outcome: {
        type: 'string',
        description: '(comma-separated)',
      },
    },
    required: ['webhookId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/webhooks/{webhookId}/latest',
    query: ['outcomes', 'event', 'outcome'],
  },
});
