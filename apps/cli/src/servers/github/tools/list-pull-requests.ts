import { defineTool, input } from '@mcpkit/core';
import { PAGE, PER_PAGE, REPO_PARAMS, STATE_FILTER } from '../const';

export const listPullRequests = defineTool({
  name: 'list_pull_requests',
  description: 'List pull requests in a repository.',
  input: input({
    ...REPO_PARAMS,
    state: STATE_FILTER,
    per_page: PER_PAGE,
    page: PAGE,
  }),
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/pulls',
    query: ['state', 'per_page', 'page'],
  },
  response: {
    fields: {
      number: 'number',
      title: 'title',
      author: 'user.login',
      head: 'head.ref',
      base: 'base.ref',
      draft: 'draft',
      url: 'html_url',
    },
  },
});
