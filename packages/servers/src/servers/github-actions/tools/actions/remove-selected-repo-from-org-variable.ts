import { defineTool } from '@usemcpkit/core';

export const actionsRemoveSelectedRepoFromOrgVariable = defineTool({
  name: 'actions:remove_selected_repo_from_org_variable',
  description:
    'Remove selected repository from an organization variable. Removes a repository from an organization variable that is available to selected repositories. Organization variables that are available to selected repositories have their `visibility` field set to `selected`.',
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
    method: 'DELETE',
    path: '/orgs/{org}/actions/variables/{name}/repositories/{repository_id}',
  },
});
