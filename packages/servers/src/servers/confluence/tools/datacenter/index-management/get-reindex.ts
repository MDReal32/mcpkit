import { defineTool } from '@usemcpkit/core';

export const datacenterIndexManagementGetReindex = defineTool({
  name: 'datacenter:index_management:get_reindex',
  description:
    '[Data Center] Get reindex status. Returns the current status of the most recent reindex operation. This includes information about progress, completion status, elapsed time, and job ID.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/index/reindex',
  },
});
