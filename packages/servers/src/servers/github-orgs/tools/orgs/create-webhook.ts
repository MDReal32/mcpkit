import { defineTool } from '@usemcpkit/core';

export const orgsCreateWebhook = defineTool({
  name: 'orgs:create_webhook',
  description: 'Create an organization webhook. Create a hook that posts payloads in JSON format.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      name: {
        type: 'string',
        description: 'Must be passed as "web".',
      },
      config: {
        type: 'object',
        description: 'Key/value pairs to provide settings for this webhook.',
        properties: {
          url: {
            type: 'string',
            description: 'The URL to which the payloads will be delivered.',
          },
          content_type: {
            type: 'string',
            description:
              'The media type used to serialize the payloads. Supported values include `json` and `form`. The default is `form`.',
          },
          secret: {
            type: 'string',
            description:
              'If provided, the `secret` will be used as the `key` to generate the HMAC hex digest value for delivery signature headers.',
          },
          insecure_ssl: {},
          username: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
        required: ['url'],
      },
      events: {
        type: 'array',
        description: 'Determines what events the hook is triggered for. Set to `["*"]` to receive all possible events.',
        items: {
          type: 'string',
        },
      },
      active: {
        type: 'boolean',
        description:
          'Determines if notifications are sent when the webhook is triggered. Set to `true` to send notifications.',
        default: true,
      },
    },
    required: ['org', 'name', 'config'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/hooks',
    body: ['name', 'config', 'events', 'active'],
  },
});
