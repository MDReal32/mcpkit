import { defineTool } from '@usemcpkit/core';

export const securityDependabotRemoveSelectedRepoFromOrgSecret = defineTool({
  name: 'security:dependabot:remove_selected_repo_from_org_secret',
  description:
    'Remove selected repository from an organization secret. Removes a repository from an organization secret when the `visibility` for repository access is set to `selected`. The visibility is set when you Create or update an organization secret.',
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
    method: 'DELETE',
    path: '/orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}',
  },
});
