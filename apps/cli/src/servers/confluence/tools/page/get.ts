import { defineTool, input } from '@usemcpkit/core';
import { CLOUD_PAGE_FIELDS, PAGE_ID, SERVER_PAGE_FIELDS } from '../../const';

export const getPage = defineTool({
  name: 'page:get',
  description: 'Get a page with its body in storage format and its current version.',
  input: input({ page_id: PAGE_ID }),
  request: {
    method: 'GET',
    path: '/rest/api/content/{page_id}',
    fixedQuery: { expand: 'body.storage,version,space' },
  },
  response: { fields: { ...SERVER_PAGE_FIELDS, body: 'body.storage.value' } },
  editions: {
    cloud: {
      request: { method: 'GET', path: '/wiki/api/v2/pages/{page_id}', fixedQuery: { 'body-format': 'storage' } },
      response: { fields: { ...CLOUD_PAGE_FIELDS, body: 'body.storage.value' } },
    },
  },
});
