import { defineTool } from '@usemcpkit/core';

export const appsListWebhookDeliveries = defineTool({
  name: 'apps:list_webhook_deliveries',
  description:
    'List deliveries for an app webhook. Returns a list of webhook deliveries for the webhook configured for a GitHub App.',
  input: {
    type: 'object',
    properties: {
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      cursor: {
        type: 'string',
        description:
          'Used for pagination: the starting delivery from which the page of deliveries is fetched. Refer to the `link` header for the next and previous page cursors.',
      },
      status: {
        type: 'string',
        enum: ['success', 'failure'],
        description:
          'Returns webhook deliveries filtered by delivery outcome classification based on `status_code` range. A `status` of `success` returns deliveries with a `status_code` in the 200-399 range (inclusive). A `status` of `failure` returns deliveries with a `status_code` in the 400-599 range (inclusive).',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/app/hook/deliveries',
    query: ['per_page', 'cursor', 'status'],
  },
});
