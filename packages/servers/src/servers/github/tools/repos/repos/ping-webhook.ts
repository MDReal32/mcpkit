import { defineTool } from '@usemcpkit/core';

export const reposReposPingWebhook = defineTool({
  name: 'repos:repos:ping_webhook',
  description: 'Ping a repository webhook. This will trigger a ping event to be sent to the hook.',
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
    },
    required: ['owner', 'repo', 'hook_id'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/hooks/{hook_id}/pings',
  },
});
