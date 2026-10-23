import { defineTool } from '@usemcpkit/core';

export const pullsList = defineTool({
  name: 'pulls:list',
  description: 'List pull requests. Lists pull requests in a specified repository.',
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
        description: 'Either `open`, `closed`, or `all` to filter by state.',
      },
      head: {
        type: 'string',
        description:
          'Filter pulls by head user or head organization and branch name in the format of `user:ref-name` or `organization:ref-name`. For example: `github:new-script-format` or `octocat:test-branch`.',
      },
      base: {
        type: 'string',
        description: 'Filter pulls by base branch name. Example: `gh-pages`.',
      },
      sort: {
        type: 'string',
        default: 'created',
        enum: ['created', 'updated', 'popularity', 'long-running'],
        description:
          'What to sort results by. `popularity` will sort by the number of comments. `long-running` will sort by date created and will limit the results to pull requests that have been open for more than a month and have had activity within the past month.',
      },
      direction: {
        type: 'string',
        enum: ['asc', 'desc'],
        description:
          'The direction of the sort. Default: `desc` when sort is `created` or sort is not specified, otherwise `asc`.',
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
    path: '/repos/{owner}/{repo}/pulls',
    query: ['state', 'head', 'base', 'sort', 'direction', 'per_page', 'page'],
  },
});
