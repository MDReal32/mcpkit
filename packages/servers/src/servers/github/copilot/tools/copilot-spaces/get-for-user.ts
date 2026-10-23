import { defineTool } from '@usemcpkit/core';

export const copilotSpacesGetForUser = defineTool({
  name: 'copilot_spaces:get_for_user',
  description:
    'Get a Copilot Space for a user. Gets details about a specific Copilot Space owned by a user. The authenticated user must have read access to the Space.',
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
    path: '/users/{username}/copilot-spaces/{space_number}',
  },
});
