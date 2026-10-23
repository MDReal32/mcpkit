import { defineTool } from '@usemcpkit/core';

export const datacenterContentGetBulkPageChildren = defineTool({
  name: 'datacenter:content:get_bulk_page_children',
  description:
    "[Data Center] Get child pages. Fetches direct child pages of a parent page. Uses bulk permission checking for optimal performance. Uses cursor (keyset) pagination: pages are ordered by id and the response includes a 'nextCursor' token (null when there are no further results). Omit 'cursor' (or pass an empty value) to fetch the first batch.",
  input: {
    type: 'object',
    properties: {
      pageId: {
        type: 'string',
      },
      cursor: {
        type: 'string',
      },
      limit: {
        type: 'integer',
      },
    },
    required: ['pageId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/content/bulk/page/{pageId}/children',
    query: ['cursor', 'limit'],
  },
});
