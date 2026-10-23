import { defineTool } from '@usemcpkit/core';

export const copilotCopilotCopilotContentExclusionForOrganization = defineTool({
  name: 'copilot:copilot:copilot_content_exclusion_for_organization',
  description:
    'Get Copilot content exclusion rules for an organization. > [!NOTE] > This endpoint is in public preview and is subject to change.',
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
    path: '/orgs/{org}/copilot/content_exclusion',
  },
});
