import { defineTool } from '@usemcpkit/core';

export const issuesListMilestones = defineTool({
  name: 'issues:list_milestones',
  description: 'List milestones. Lists milestones for a repository.',
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
      state: {
        type: 'string',
        default: 'open',
        enum: ['open', 'closed', 'all'],
        description: 'The state of the milestone. Either `open`, `closed`, or `all`.',
      },
      sort: {
        type: 'string',
        default: 'due_on',
        enum: ['due_on', 'completeness'],
        description: 'What to sort results by. Either `due_on` or `completeness`.',
      },
      direction: {
        type: 'string',
        default: 'asc',
        enum: ['asc', 'desc'],
        description: 'The direction of the sort. Either `asc` or `desc`.',
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
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/milestones',
    query: ['state', 'sort', 'direction', 'per_page', 'page'],
  },
});
