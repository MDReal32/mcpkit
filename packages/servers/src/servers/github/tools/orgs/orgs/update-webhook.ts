import { defineTool } from '@usemcpkit/core';

export const orgsOrgsUpdateWebhook = defineTool({
  name: 'orgs:orgs:update_webhook',
  description:
    'Update an organization webhook. Updates a webhook configured in an organization. When you update a webhook, the `secret` will be overwritten. If you previously had a `secret` set, you must provide the same `secret` or set a new `secret` or the secret will be removed. If you are only updating individual webhook `config` properties, use "Update a webhook configuration for an organization".',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      hook_id: {
        type: 'integer',
        description:
          'The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery.',
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
        },
        required: ['url'],
      },
      events: {
        type: 'array',
        description: 'Determines what events the hook is triggered for.',
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
      name: {
        type: 'string',
      },
    },
    required: ['org', 'hook_id'],
  },
  request: {
    method: 'PATCH',
    path: '/orgs/{org}/hooks/{hook_id}',
    body: ['config', 'events', 'active', 'name'],
  },
});
