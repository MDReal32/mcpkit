import { defineTool } from '@usemcpkit/core';

export const orgsPingWebhook = defineTool({
  name: 'orgs:ping_webhook',
  description: 'Ping an organization webhook. This will trigger a ping event to be sent to the hook.',
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
    method: 'POST',
    path: '/orgs/{org}/hooks/{hook_id}/pings',
  },
});
