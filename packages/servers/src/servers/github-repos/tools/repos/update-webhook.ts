import { defineTool } from '@usemcpkit/core';

export const reposUpdateWebhook = defineTool({
  name: 'repos:update_webhook',
  description:
    'Update a repository webhook. Updates a webhook configured in a repository. If you previously had a `secret` set, you must provide the same `secret` or set a new `secret` or the secret will be removed. If you are only updating individual webhook `config` properties, use "Update a webhook configuration for a repository."',
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
      hook_id: {
        type: 'integer',
        description:
          'The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery.',
      },
      config: {
        type: 'object',
        description: 'Configuration object of the webhook',
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
        description: 'Determines what events the hook is triggered for. This replaces the entire array of events.',
        items: {
          type: 'string',
        },
      },
      add_events: {
        type: 'array',
        description: 'Determines a list of events to be added to the list of events that the Hook triggers for.',
        items: {
          type: 'string',
        },
      },
      remove_events: {
        type: 'array',
        description: 'Determines a list of events to be removed from the list of events that the Hook triggers for.',
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
    required: ['owner', 'repo', 'hook_id'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/hooks/{hook_id}',
    body: ['config', 'events', 'add_events', 'remove_events', 'active'],
  },
});
