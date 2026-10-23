import { defineTool } from '@usemcpkit/core';

export const securityAccessTokensDeleteProjectsServiceAccountsPersonalAccessTokens = defineTool({
  name: 'security:access_tokens:delete_projects_service_accounts_personal_access_tokens',
  description:
    'Revoke a personal access token for a project service account. Revokes a specified personal access token for a project service account.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      token_id: {
        type: 'integer',
        description: 'ID of the personal access token.',
      },
      user_id: {
        type: 'integer',
        description: 'ID of the service account.',
      },
    },
    required: ['id', 'token_id', 'user_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/service_accounts/{user_id}/personal_access_tokens/{token_id}',
  },
});
