import { defineTool } from '@usemcpkit/core';

export const administrationServerInfoGetServerInfo = defineTool({
  name: 'administration:server_info:get_server_info',
  description: 'Get Jira instance info. Returns information about the Jira instance.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/serverInfo',
  },
});
