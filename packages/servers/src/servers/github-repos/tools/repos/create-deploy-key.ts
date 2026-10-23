import { defineTool } from '@usemcpkit/core';

export const reposCreateDeployKey = defineTool({
  name: 'repos:create_deploy_key',
  description: 'Create a deploy key. You can create a read-only deploy key.',
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
      title: {
        type: 'string',
        description: 'A name for the key.',
      },
      key: {
        type: 'string',
        description: 'The contents of the key.',
      },
      read_only: {
        type: 'boolean',
        description:
          'If `true`, the key will only be able to read repository contents. Otherwise, the key will be able to read and write.',
      },
    },
    required: ['owner', 'repo', 'key'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/keys',
    body: ['title', 'key', 'read_only'],
  },
});
