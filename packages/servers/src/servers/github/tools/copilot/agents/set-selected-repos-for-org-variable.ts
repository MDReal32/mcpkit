import { defineTool } from '@usemcpkit/core';

export const copilotAgentsSetSelectedReposForOrgVariable = defineTool({
  name: 'copilot:agents:set_selected_repos_for_org_variable',
  description:
    'Set selected repositories for an organization variable. Replaces all repositories for an organization agent variable that is available to selected repositories. Organization variables that are available to selected repositories have their `visibility` field set to `selected`.',
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
      selected_repository_ids: {
        type: 'array',
        description: 'The IDs of the repositories that can access the organization variable.',
        items: {
          type: 'integer',
        },
      },
    },
    required: ['org', 'name', 'selected_repository_ids'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/agents/variables/{name}/repositories',
    body: ['selected_repository_ids'],
  },
});
