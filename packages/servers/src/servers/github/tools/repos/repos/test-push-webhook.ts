import { defineTool } from '@usemcpkit/core';

export const reposReposTestPushWebhook = defineTool({
  name: 'repos:repos:test_push_webhook',
  description:
    'Test the push repository webhook. This will trigger the hook with the latest push to the current repository if the hook is subscribed to `push` events. If the hook is not subscribed to `push` events, the server will respond with 204 but no test POST will be generated.',
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
    path: '/repos/{owner}/{repo}/hooks/{hook_id}/tests',
  },
});
