import { defineTool } from '@usemcpkit/core';

export const actionsAddSelectedRepoToOrgVariable = defineTool({
  name: 'actions:add_selected_repo_to_org_variable',
  description:
    'Add selected repository to an organization variable. Adds a repository to an organization variable that is available to selected repositories. Organization variables that are available to selected repositories have their `visibility` field set to `selected`.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      name: {
        type: 'string',
        description: 'The name of the variable.',
      },
      repository_id: {
        type: 'integer',
      },
    },
    required: ['org', 'name', 'repository_id'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/actions/variables/{name}/repositories/{repository_id}',
  },
});
