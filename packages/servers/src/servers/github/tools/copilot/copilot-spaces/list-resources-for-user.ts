import { defineTool } from '@usemcpkit/core';

export const copilotCopilotSpacesListResourcesForUser = defineTool({
  name: 'copilot:copilot_spaces:list_resources_for_user',
  description:
    'List resources for a Copilot Space for a user. Lists all resources attached to a specific Copilot Space owned by a user. The authenticated user must have appropriate permissions to view the space.',
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
      space_number: {
        type: 'integer',
        description: 'The unique identifier of the Copilot Space.',
      },
    },
    required: ['username', 'space_number'],
  },
  request: {
    method: 'GET',
    path: '/users/{username}/copilot-spaces/{space_number}/resources',
  },
});
