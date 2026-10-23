import { defineTool } from '@usemcpkit/core';

export const collaborationWebhooksGetDynamicWebhooksForApp = defineTool({
  name: 'collaboration:webhooks:get_dynamic_webhooks_for_app',
  description: 'Get dynamic webhooks for app. Returns a paginated list of the webhooks registered by the calling app.',
  input: {
    type: 'object',
    properties: {
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'integer',
        default: 100,
        description: 'The maximum number of items to return per page.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/webhook',
    query: ['startAt', 'maxResults'],
  },
});
