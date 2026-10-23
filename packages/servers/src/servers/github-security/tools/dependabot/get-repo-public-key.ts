import { defineTool } from '@usemcpkit/core';

export const dependabotGetRepoPublicKey = defineTool({
  name: 'dependabot:get_repo_public_key',
  description:
    'Get a repository public key. Gets your public key, which you need to encrypt secrets. You need to encrypt a secret before you can create or update secrets. Anyone with read access to the repository can use this endpoint.',
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
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/dependabot/secrets/public-key',
  },
});
