import { defineTool } from '@usemcpkit/core';

export const copilotCopilotSpacesGetResourceForUser = defineTool({
  name: 'copilot:copilot_spaces:get_resource_for_user',
  description:
    'Get a resource for a Copilot Space for a user. Gets a specific resource attached to a Copilot Space owned by a user. The authenticated user must have appropriate permissions to view the space.',
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
      space_resource_id: {
        type: 'integer',
        description: 'The unique identifier of the resource.',
      },
    },
    required: ['username', 'space_number', 'space_resource_id'],
  },
  request: {
    method: 'GET',
    path: '/users/{username}/copilot-spaces/{space_number}/resources/{space_resource_id}',
  },
});
