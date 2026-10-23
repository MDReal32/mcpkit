import { defineTool } from '@usemcpkit/core';

export const appsCodespacesAddRepositoryForSecretForAuthenticatedUser = defineTool({
  name: 'apps:codespaces:add_repository_for_secret_for_authenticated_user',
  description:
    "Add a selected repository to a user secret. Adds a repository to the selected repositories for a user's development environment secret.",
  input: {
    type: 'object',
    properties: {
      secret_name: {
        type: 'string',
        description: 'The name of the secret.',
      },
      repository_id: {
        type: 'integer',
      },
    },
    required: ['secret_name', 'repository_id'],
  },
  request: {
    method: 'PUT',
    path: '/user/codespaces/secrets/{secret_name}/repositories/{repository_id}',
  },
});
