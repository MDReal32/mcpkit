import { defineTool } from '@usemcpkit/core';

export const actionsActionsListConcurrencyGroupsForRepository = defineTool({
  name: 'actions:actions:list_concurrency_groups_for_repository',
  description: 'List concurrency groups for a repository. Lists the active concurrency groups for a repository.',
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
      after: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results after this cursor. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/concurrency_groups',
    query: ['per_page', 'after'],
  },
});
