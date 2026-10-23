import { defineTool } from '@usemcpkit/core';

export const reposRedeliverWebhookDelivery = defineTool({
  name: 'repos:redeliver_webhook_delivery',
  description:
    'Redeliver a delivery for a repository webhook. Redeliver a webhook delivery for a webhook configured in a repository.',
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
      delivery_id: {
        type: 'integer',
      },
    },
    required: ['owner', 'repo', 'hook_id', 'delivery_id'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}/attempts',
  },
});
