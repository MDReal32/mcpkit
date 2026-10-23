import { defineTool } from '@usemcpkit/core';

export const dependabotCreateOrUpdateOrgSecret = defineTool({
  name: 'dependabot:create_or_update_org_secret',
  description:
    'Create or update an organization secret. Creates or updates an organization secret with an encrypted value. Encrypt your secret using LibSodium. For more information, see "Encrypting secrets for the REST API."',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      secret_name: {
        type: 'string',
        description: 'The name of the secret.',
      },
      encrypted_value: {
        type: 'string',
        description:
          'Value for your secret, encrypted with LibSodium using the public key retrieved from the Get an organization public key endpoint.',
      },
      key_id: {
        type: 'string',
        description: 'ID of the key you used to encrypt the secret.',
      },
      visibility: {
        type: 'string',
        description:
          'Which type of organization repositories have access to the organization secret. `selected` means only the repositories specified by `selected_repository_ids` can access the secret.',
        enum: ['all', 'private', 'selected'],
      },
      selected_repository_ids: {
        type: 'array',
        description:
          'An array of repository ids that can access the organization secret. You can only provide a list of repository ids when the `visibility` is set to `selected`. You can manage the list of selected repositories using the List selected repositories for an organization secret, Set selected repositories for an organization secret, and Remove selected repository from an organization secret endpoints.',
        items: {},
      },
    },
    required: ['org', 'secret_name', 'visibility'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/dependabot/secrets/{secret_name}',
    body: ['encrypted_value', 'key_id', 'visibility', 'selected_repository_ids'],
  },
});
