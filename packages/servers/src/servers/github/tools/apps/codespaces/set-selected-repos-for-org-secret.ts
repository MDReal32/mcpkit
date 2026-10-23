import { defineTool } from '@usemcpkit/core';

export const appsCodespacesSetSelectedReposForOrgSecret = defineTool({
  name: 'apps:codespaces:set_selected_repos_for_org_secret',
  description:
    'Set selected repositories for an organization secret. Replaces all repositories for an organization development environment secret when the `visibility` for repository access is set to `selected`. The visibility is set when you Create or update an organization secret.',
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
      selected_repository_ids: {
        type: 'array',
        description:
          'An array of repository ids that can access the organization secret. You can only provide a list of repository ids when the `visibility` is set to `selected`. You can add and remove individual repositories using the Set selected repositories for an organization secret and Remove selected repository from an organization secret endpoints.',
        items: {
          type: 'integer',
        },
      },
    },
    required: ['org', 'secret_name', 'selected_repository_ids'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/codespaces/secrets/{secret_name}/repositories',
    body: ['selected_repository_ids'],
  },
});
