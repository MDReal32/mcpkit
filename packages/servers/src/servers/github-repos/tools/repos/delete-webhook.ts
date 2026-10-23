import { defineTool } from '@usemcpkit/core';

export const reposDeleteWebhook = defineTool({
  name: 'repos:delete_webhook',
  description: 'Delete a repository webhook. Delete a webhook for an organization.',
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
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/hooks/{hook_id}',
  },
});
