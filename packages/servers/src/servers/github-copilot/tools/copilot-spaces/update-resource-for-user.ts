import { defineTool } from '@usemcpkit/core';

export const copilotSpacesUpdateResourceForUser = defineTool({
  name: 'copilot_spaces:update_resource_for_user',
  description:
    'Set a resource for a Copilot Space for a user. Updates the metadata of a resource in a specific Copilot Space owned by a user. The authenticated user must have write permissions on the space.',
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
      metadata: {
        type: 'object',
        description: 'Updated resource-specific metadata.',
      },
    },
    required: ['username', 'space_number', 'space_resource_id'],
  },
  request: {
    method: 'PUT',
    path: '/users/{username}/copilot-spaces/{space_number}/resources/{space_resource_id}',
    body: ['metadata'],
  },
});
