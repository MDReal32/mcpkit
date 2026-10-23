import { defineTool, input } from '@mcpkit/core';
import { CLOUD_PAGE_LIST_FIELDS, LIMIT, PAGE_ID, SERVER_PAGE_LIST_FIELDS } from '../const';

export const getPageChildren = defineTool({
  name: 'get_page_children',
  description: 'List the child pages of a page.',
  input: input({ page_id: PAGE_ID, limit: LIMIT }),
  request: { method: 'GET', path: '/rest/api/content/{page_id}/child/page', query: ['limit'] },
  response: { root: 'results', fields: SERVER_PAGE_LIST_FIELDS },
  editions: {
    cloud: {
      request: { method: 'GET', path: '/wiki/api/v2/pages/{page_id}/children', query: ['limit'] },
      response: { root: 'results', fields: CLOUD_PAGE_LIST_FIELDS },
    },
  },
});
