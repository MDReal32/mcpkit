import { defineTool } from '@usemcpkit/core';

export const reposGetWebhook = defineTool({
  name: 'repos:get_webhook',
  description:
    'Get a repository webhook. Returns a webhook configured in a repository. To get only the webhook `config` properties, see "Get a webhook configuration for a repository."',
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
    method: 'GET',
    path: '/repos/{owner}/{repo}/hooks/{hook_id}',
  },
});
