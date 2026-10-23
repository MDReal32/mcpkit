import { defineTool, input, string } from '@usemcpkit/core';
import { LIMIT } from '../const';

export const search = defineTool({
  name: 'search',
  description: 'Search content with CQL, for example `space = DOCS AND text ~ "release"`.',
  input: input({ cql: string('CQL query'), limit: LIMIT }),
  request: {
    method: 'GET',
    path: '/rest/api/content/search',
    query: ['cql', 'limit'],
    fixedQuery: { expand: 'space' },
  },
  response: {
    root: 'results',
    fields: { id: 'id', title: 'title', type: 'type', space: 'space.key', url: '_links.webui' },
  },
  editions: {
    cloud: {
      request: { method: 'GET', path: '/wiki/rest/api/search', query: ['cql', 'limit'] },
      response: {
        root: 'results',
        fields: { id: 'content.id', title: 'content.title', type: 'content.type', url: 'url', excerpt: 'excerpt' },
      },
    },
  },
});
