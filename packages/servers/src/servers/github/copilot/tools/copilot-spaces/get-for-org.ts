import { defineTool } from '@usemcpkit/core';

export const copilotSpacesGetForOrg = defineTool({
  name: 'copilot_spaces:get_for_org',
  description:
    'Get an organization Copilot Space. Gets details about a specific Copilot Space owned by an organization. The authenticated user must have read access to the Space.',
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
    path: '/orgs/{org}/copilot-spaces/{space_number}',
  },
});
