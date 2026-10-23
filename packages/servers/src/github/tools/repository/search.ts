import { defineTool, input, number, string } from '@usemcpkit/core';

export const searchRepositories = defineTool({
  name: 'repository:search',
  description: 'Search repositories using GitHub search syntax.',
  input: input({
    query: string("Search query, e.g. 'mcp language:rust stars:>100'"),
    per_page: number('Results per page (max 100)', { default: 10 }),
  }),
  request: { method: 'GET', path: '/search/repositories', query: { q: 'query', per_page: 'per_page' } },
  response: {
    root: 'items',
    fields: {
      full_name: 'full_name',
      description: 'description',
      stars: 'stargazers_count',
      url: 'html_url',
    },
  },
});
