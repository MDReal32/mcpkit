import { defineTool } from '@usemcpkit/core';

export const orgsOrgsGetWebhook = defineTool({
  name: 'orgs:orgs:get_webhook',
  description:
    'Get an organization webhook. Returns a webhook configured in an organization. To get only the webhook `config` properties, see "Get a webhook configuration for an organization.',
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
    path: '/orgs/{org}/hooks/{hook_id}',
  },
});
