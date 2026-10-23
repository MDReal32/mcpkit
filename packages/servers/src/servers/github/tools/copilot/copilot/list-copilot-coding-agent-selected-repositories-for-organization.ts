import { defineTool } from '@usemcpkit/core';

export const copilotCopilotListCopilotCodingAgentSelectedRepositoriesForOrganization = defineTool({
  name: 'copilot:copilot:list_copilot_coding_agent_selected_repositories_for_organization',
  description:
    'List repositories enabled for Copilot cloud agent in an organization. > [!NOTE] > This endpoint is in public preview and is subject to change.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/copilot/coding-agent/permissions/repositories',
    query: ['per_page', 'page'],
  },
});
