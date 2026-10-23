import { defineTool } from '@usemcpkit/core';

export const copilotCopilotEnableCopilotCodingAgentForRepositoryInOrganization = defineTool({
  name: 'copilot:copilot:enable_copilot_coding_agent_for_repository_in_organization',
  description:
    'Enable a repository for Copilot cloud agent in an organization. > [!NOTE] > This endpoint is in public preview and is subject to change.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      repository_id: {
        type: 'integer',
        description: 'The unique identifier of the repository.',
      },
    },
    required: ['org', 'repository_id'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/copilot/coding-agent/permissions/repositories/{repository_id}',
  },
});
