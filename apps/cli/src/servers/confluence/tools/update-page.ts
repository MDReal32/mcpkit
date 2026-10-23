import { defineTool, input, number, string } from '@usemcpkit/core';
import { CLOUD_PAGE_FIELDS, PAGE_ID, SERVER_PAGE_FIELDS, STORAGE_REPRESENTATION } from '../const';

export const updatePage = defineTool({
  name: 'update_page',
  description: 'Replace the title and body of a page. Pass the current version from get_page plus one.',
  input: input({
    page_id: PAGE_ID,
    title: string('Page title'),
    body: string('Page body in Confluence storage format (XHTML)'),
    version: number('New version number: the current version + 1'),
  }),
  request: {
    method: 'PUT',
    path: '/rest/api/content/{page_id}',
    body: { id: 'page_id', title: 'title', 'body.storage.value': 'body', 'version.number': 'version' },
    fixedBody: { type: 'page', 'body.storage.representation': STORAGE_REPRESENTATION },
  },
  response: { fields: SERVER_PAGE_FIELDS },
  editions: {
    cloud: {
      request: {
        method: 'PUT',
        path: '/wiki/api/v2/pages/{page_id}',
        body: { id: 'page_id', title: 'title', 'body.value': 'body', 'version.number': 'version' },
        fixedBody: { status: 'current', 'body.representation': STORAGE_REPRESENTATION },
      },
      response: { fields: CLOUD_PAGE_FIELDS },
    },
  },
});
