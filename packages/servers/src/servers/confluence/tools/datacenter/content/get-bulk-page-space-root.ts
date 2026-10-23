import { defineTool } from '@usemcpkit/core';

export const datacenterContentGetBulkPageSpaceRoot = defineTool({
  name: 'datacenter:content:get_bulk_page_space_root',
  description:
    "[Data Center] Get root pages in a space. Fetches root (top-level) pages in a space with hasChildren flags. Uses bulk permission checking for optimal performance. Uses cursor (keyset) pagination: pages are ordered by id and the response includes a 'nextCursor' token (null when there are no further results). Omit 'cursor' (or pass an empty value) to fetch the first batch.",
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
      },
      cursor: {
        type: 'string',
      },
      limit: {
        type: 'integer',
      },
    },
    required: ['spaceKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/content/bulk/page/space/{spaceKey}/root',
    query: ['cursor', 'limit'],
  },
});
