import { defineTool } from '@usemcpkit/core';

export const datacenterContentGetBulkPageDeleteLimits = defineTool({
  name: 'datacenter:content:get_bulk_page_delete_limits',
  description:
    '[Data Center] Get bulk delete limits. Returns the limits and constraints for bulk delete operations, including the maximum number of entries allowed per request.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/content/bulk/page/delete/limits',
  },
});
