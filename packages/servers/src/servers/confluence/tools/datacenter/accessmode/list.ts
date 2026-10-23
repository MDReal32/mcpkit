import { defineTool } from '@usemcpkit/core';

export const datacenterAccessmodeList = defineTool({
  name: 'datacenter:accessmode:list',
  description: '[Data Center] Get access mode status. Returns the access mode status for Confluence.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/accessmode',
  },
});
