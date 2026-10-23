import { defineTool } from '@usemcpkit/core';

export const copilotSpacesCreateResourceForUser = defineTool({
  name: 'copilot_spaces:create_resource_for_user',
  description:
    'Create a resource for a Copilot Space for a user. Creates a new resource in a specific Copilot Space owned by a user. The authenticated user must have write permissions on the space.',
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
      resource_type: {
        type: 'string',
        description: 'The type of resource to create.',
        enum: ['repository', 'github_file', 'free_text', 'github_issue', 'github_pull_request'],
      },
      metadata: {
        type: 'object',
        description: 'Resource-specific metadata.',
      },
    },
    required: ['username', 'space_number', 'resource_type', 'metadata'],
  },
  request: {
    method: 'POST',
    path: '/users/{username}/copilot-spaces/{space_number}/resources',
    body: ['resource_type', 'metadata'],
  },
});
