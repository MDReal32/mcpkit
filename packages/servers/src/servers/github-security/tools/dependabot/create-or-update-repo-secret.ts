import { defineTool } from '@usemcpkit/core';

export const dependabotCreateOrUpdateRepoSecret = defineTool({
  name: 'dependabot:create_or_update_repo_secret',
  description:
    'Create or update a repository secret. Creates or updates a repository secret with an encrypted value. Encrypt your secret using LibSodium. For more information, see "Encrypting secrets for the REST API."',
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
      secret_name: {
        type: 'string',
        description: 'The name of the secret.',
      },
      encrypted_value: {
        type: 'string',
        description:
          'Value for your secret, encrypted with LibSodium using the public key retrieved from the Get a repository public key endpoint.',
      },
      key_id: {
        type: 'string',
        description: 'ID of the key you used to encrypt the secret.',
      },
    },
    required: ['owner', 'repo', 'secret_name'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/dependabot/secrets/{secret_name}',
    body: ['encrypted_value', 'key_id'],
  },
});
