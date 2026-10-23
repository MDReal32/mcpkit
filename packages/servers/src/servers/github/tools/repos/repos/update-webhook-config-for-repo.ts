import { defineTool } from '@usemcpkit/core';

export const reposReposUpdateWebhookConfigForRepo = defineTool({
  name: 'repos:repos:update_webhook_config_for_repo',
  description:
    'Update a webhook configuration for a repository. Updates the webhook configuration for a repository. To update more information about the webhook, including the `active` state and `events`, use "Update a repository webhook."',
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
    required: ['owner', 'repo', 'hook_id'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/hooks/{hook_id}/config',
    body: ['url', 'content_type', 'secret', 'insecure_ssl'],
  },
});
