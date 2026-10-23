import { defineTool } from '@usemcpkit/core';

export const reposCreateWebhook = defineTool({
  name: 'repos:create_webhook',
  description:
    'Create a repository webhook. Repositories can have multiple webhooks installed. Each webhook should have a unique `config`. Multiple webhooks can share the same `config` as long as those webhooks do not have any `events` that overlap.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      name: {
        type: 'string',
        description: 'Use `web` to create a webhook. Default: `web`. This parameter only accepts the value `web`.',
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
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/hooks',
    body: ['name', 'config', 'events', 'active'],
  },
});
