import { defineTool } from '@usemcpkit/core';

export const copilotSpacesCreateForUser = defineTool({
  name: 'copilot_spaces:create_for_user',
  description:
    'Create a Copilot Space for a user. Creates a new Copilot Space owned by a user. Only the authenticated user can create spaces for their own account.',
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
      name: {
        type: 'string',
        description: 'The name of the Copilot Space.',
      },
      description: {
        type: 'string',
        description: 'A description of the Copilot Space.',
      },
      general_instructions: {
        type: 'string',
        description: 'General instructions for the Copilot Space.',
      },
      base_role: {
        type: 'string',
        description:
          'The base role that determines default permissions for the space. - `no_access`: No default access (default) - `reader`: Makes the space publicly readable Note: User spaces do not support writer or admin base roles.',
        default: 'no_access',
        enum: ['reader', 'no_access'],
      },
      resources_attributes: {
        type: 'array',
        description: 'Resources to attach to the space.',
        items: {
          type: 'object',
          properties: {
            resource_type: {
              type: 'string',
              description: 'The type of resource.',
              enum: [
                'repository',
                'github_file',
                'free_text',
                'github_issue',
                'github_pull_request',
                'media_content',
                'uploaded_text_file',
              ],
            },
            metadata: {
              type: 'object',
              description: 'Metadata specific to the resource type.',
            },
          },
        },
      },
    },
    required: ['username', 'name'],
  },
  request: {
    method: 'POST',
    path: '/users/{username}/copilot-spaces',
    body: ['name', 'description', 'general_instructions', 'base_role', 'resources_attributes'],
  },
});
