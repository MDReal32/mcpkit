import { defineTool, input, optional, string } from '@usemcpkit/core';
import { CLOUD_PAGE_FIELDS, SERVER_PAGE_FIELDS, STORAGE_REPRESENTATION } from '../const';

export const createPage = defineTool({
  name: 'create_page',
  description: 'Create a page, optionally under a parent page.',
  input: input({
    space: string('Space key on Data Center, space id on Cloud (see list_spaces)'),
    title: string('Page title'),
    body: string('Page body in Confluence storage format (XHTML)'),
    parent_id: optional(string('Parent page id')),
  }),
  request: {
    method: 'POST',
    path: '/rest/api/content',
    body: { title: 'title', 'space.key': 'space', 'body.storage.value': 'body', 'ancestors.0.id': 'parent_id' },
    fixedBody: { type: 'page', 'body.storage.representation': STORAGE_REPRESENTATION },
  },
  response: { fields: SERVER_PAGE_FIELDS },
  editions: {
    cloud: {
      request: {
        method: 'POST',
        path: '/wiki/api/v2/pages',
        body: { spaceId: 'space', title: 'title', 'body.value': 'body', parentId: 'parent_id' },
        fixedBody: { status: 'current', 'body.representation': STORAGE_REPRESENTATION },
      },
      response: { fields: CLOUD_PAGE_FIELDS },
    },
  },
});
