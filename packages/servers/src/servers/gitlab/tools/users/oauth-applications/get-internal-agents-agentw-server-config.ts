import { defineTool } from '@usemcpkit/core';

export const usersOauthApplicationsGetInternalAgentsAgentwServerConfig = defineTool({
  name: 'users:oauth_applications:get_internal_agents_agentw_server_config',
  description: 'server_config. Returns configuration for Workspaces HTTP Server.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/internal/agents/agentw/server_config',
  },
});
