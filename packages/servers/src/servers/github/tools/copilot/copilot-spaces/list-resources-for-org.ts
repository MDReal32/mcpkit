import { defineTool } from '@usemcpkit/core';

export const copilotCopilotSpacesListResourcesForOrg = defineTool({
  name: 'copilot:copilot_spaces:list_resources_for_org',
  description:
    'List resources for an organization Copilot Space. Lists all resources attached to a specific Copilot Space owned by an organization. The authenticated user must have appropriate permissions to view the space.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      space_number: {
        type: 'integer',
        description: 'The unique identifier of the Copilot Space.',
      },
    },
    required: ['org', 'space_number'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/copilot-spaces/{space_number}/resources',
  },
});
