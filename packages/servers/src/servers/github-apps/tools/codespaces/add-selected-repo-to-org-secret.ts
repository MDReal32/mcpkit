import { defineTool } from '@usemcpkit/core';

export const codespacesAddSelectedRepoToOrgSecret = defineTool({
  name: 'codespaces:add_selected_repo_to_org_secret',
  description:
    'Add selected repository to an organization secret. Adds a repository to an organization development environment secret when the `visibility` for repository access is set to `selected`. The visibility is set when you Create or update an organization secret. OAuth app tokens and personal access tokens (classic) need the `admin:org` scope to use this endpoint.',
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
      repository_id: {
        type: 'integer',
      },
    },
    required: ['org', 'secret_name', 'repository_id'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}',
  },
});
