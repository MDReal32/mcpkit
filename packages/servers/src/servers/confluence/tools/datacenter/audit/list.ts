import { defineTool } from '@usemcpkit/core';

export const datacenterAuditList = defineTool({
  name: 'datacenter:audit:list',
  description: '[Data Center] [Deprecated] ',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/audit',
  },
});
