import { defineTool } from '@usemcpkit/core';

export const copilotCopilotGetCopilotOrganizationDetails = defineTool({
  name: 'copilot:copilot:get_copilot_organization_details',
  description:
    'Get Copilot seat information and settings for an organization. > [!NOTE] > This endpoint is in public preview and is subject to change.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/copilot/billing',
  },
});
