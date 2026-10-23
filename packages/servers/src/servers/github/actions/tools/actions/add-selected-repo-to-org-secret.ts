import { defineTool } from '@usemcpkit/core';

export const actionsAddSelectedRepoToOrgSecret = defineTool({
  name: 'actions:add_selected_repo_to_org_secret',
  description:
    'Add selected repository to an organization secret. Adds a repository to an organization secret when the `visibility` for repository access is set to `selected`. For more information about setting the visibility, see Create or update an organization secret.',
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
    path: '/orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}',
  },
});
