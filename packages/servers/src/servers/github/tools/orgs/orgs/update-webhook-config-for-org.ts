import { defineTool } from '@usemcpkit/core';

export const orgsOrgsUpdateWebhookConfigForOrg = defineTool({
  name: 'orgs:orgs:update_webhook_config_for_org',
  description:
    'Update a webhook configuration for an organization. Updates the webhook configuration for an organization. To update more information about the webhook, including the `active` state and `events`, use "Update an organization webhook ."',
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
    required: ['org', 'hook_id'],
  },
  request: {
    method: 'PATCH',
    path: '/orgs/{org}/hooks/{hook_id}/config',
    body: ['url', 'content_type', 'secret', 'insecure_ssl'],
  },
});
