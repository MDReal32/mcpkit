import { defineTool } from '@usemcpkit/core';

export const collaborationWebhooksGetFailedWebhooks = defineTool({
  name: 'collaboration:webhooks:get_failed_webhooks',
  description:
    'Get failed webhooks. Returns webhooks that have recently failed to be delivered to the requesting app after the maximum number of retries.',
  input: {
    type: 'object',
    properties: {
      maxResults: {
        type: 'integer',
        description:
          'The maximum number of webhooks to return per page. If obeying the maxResults directive would result in records with the same failure time being split across pages, the directive is ignored and all records with the same failure time included on the page.',
      },
      after: {
        type: 'integer',
        description:
          'The time after which any webhook failure must have occurred for the record to be returned, expressed as milliseconds since the UNIX epoch.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/webhook/failed',
    query: ['maxResults', 'after'],
  },
});
