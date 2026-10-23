import { defineTool } from '@usemcpkit/core';

export const aiGitlabDuoCreateAiThirdPartyAgentsDirectAccess = defineTool({
  name: 'ai:gitlab_duo:create_ai_third_party_agents_direct_access',
  description:
    'Get connection details for third party agents. Returns connection details including tokens for accessing third-party agents.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'POST',
    path: '/ai/third_party_agents/direct_access',
  },
});
