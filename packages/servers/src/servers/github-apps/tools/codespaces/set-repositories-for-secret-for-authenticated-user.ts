import { defineTool } from '@usemcpkit/core';

export const codespacesSetRepositoriesForSecretForAuthenticatedUser = defineTool({
  name: 'codespaces:set_repositories_for_secret_for_authenticated_user',
  description:
    "Set selected repositories for a user secret. Select the repositories that will use a user's development environment secret.",
  input: {
    type: 'object',
    properties: {
      secret_name: {
        type: 'string',
        description: 'The name of the secret.',
      },
      selected_repository_ids: {
        type: 'array',
        description:
          'An array of repository ids for which a codespace can access the secret. You can manage the list of selected repositories using the List selected repositories for a user secret, Add a selected repository to a user secret, and Remove a selected repository from a user secret endpoints.',
        items: {
          type: 'integer',
        },
      },
    },
    required: ['secret_name', 'selected_repository_ids'],
  },
  request: {
    method: 'PUT',
    path: '/user/codespaces/secrets/{secret_name}/repositories',
    body: ['selected_repository_ids'],
  },
});
