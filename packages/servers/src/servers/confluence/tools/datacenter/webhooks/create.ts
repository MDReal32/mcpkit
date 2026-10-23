import { defineTool } from '@usemcpkit/core';

export const datacenterWebhooksCreate = defineTool({
  name: 'datacenter:webhooks:create',
  description:
    '[Data Center] Create webhook. Create a webhook via the URL. The authenticated user must be an administrator to call this resource.',
  input: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      configuration: {
        type: 'object',
      },
      url: {
        type: 'string',
      },
      credentials: {
        type: 'object',
        properties: {
          password: {
            type: 'string',
          },
          username: {
            type: 'string',
          },
        },
      },
      statistics: {
        type: 'object',
      },
      scopeType: {
        type: 'string',
      },
      events: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      active: {
        type: 'boolean',
      },
      sslVerificationRequired: {
        type: 'boolean',
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/webhooks',
    body: [
      'name',
      'configuration',
      'url',
      'credentials',
      'statistics',
      'scopeType',
      'events',
      'active',
      'sslVerificationRequired',
    ],
  },
});
