import { defineTool } from '@usemcpkit/core';

export const copilotSpacesDeleteResourceForUser = defineTool({
  name: 'copilot_spaces:delete_resource_for_user',
  description:
    'Delete a resource from a Copilot Space for a user. Deletes a resource from a specific Copilot Space owned by a user. The authenticated user must have write permissions on the space.',
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
    method: 'DELETE',
    path: '/users/{username}/copilot-spaces/{space_number}/resources/{space_resource_id}',
  },
});
