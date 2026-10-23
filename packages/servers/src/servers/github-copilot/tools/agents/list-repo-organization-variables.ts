import { defineTool } from '@usemcpkit/core';

export const agentsListRepoOrganizationVariables = defineTool({
  name: 'agents:list_repo_organization_variables',
  description: 'List repository organization variables. Lists all organization variables shared with a repository.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      per_page: {
        type: 'integer',
        default: 10,
        description:
          'The number of results per page (max 30). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/agents/organization-variables',
    query: ['per_page', 'page'],
  },
});
