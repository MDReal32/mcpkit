import { defineTool } from '@usemcpkit/core';

export const actionsGetRepoActionsPolicies = defineTool({
  name: 'actions:get_repo_actions_policies',
  description: 'List repository Actions policies. List all Actions policies for a repository.',
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
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      has_parents: {
        type: 'boolean',
        default: true,
        description: 'Include policies configured at higher levels that apply to this repository',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/policies',
    query: ['per_page', 'page', 'has_parents'],
  },
});
