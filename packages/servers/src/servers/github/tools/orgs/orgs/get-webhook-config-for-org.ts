import { defineTool } from '@usemcpkit/core';

export const orgsOrgsGetWebhookConfigForOrg = defineTool({
  name: 'orgs:orgs:get_webhook_config_for_org',
  description:
    'Get a webhook configuration for an organization. Returns the webhook configuration for an organization. To get more information about the webhook, including the `active` state and `events`, use "Get an organization webhook ."',
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
    },
    required: ['org', 'hook_id'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/hooks/{hook_id}/config',
  },
});
