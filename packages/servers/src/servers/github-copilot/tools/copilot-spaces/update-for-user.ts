import { defineTool } from '@usemcpkit/core';

export const copilotSpacesUpdateForUser = defineTool({
  name: 'copilot_spaces:update_for_user',
  description:
    'Set a Copilot Space for a user. Updates a Copilot Space owned by a user. Only the authenticated user can update spaces for their own account.',
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
          'The base role that determines default permissions for the space. Changing this field requires admin permissions. - `no_access`: No default access (default) - `reader`: Makes the space publicly readable Note: User spaces do not support writer or admin base roles.',
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
    required: ['username', 'space_number'],
  },
  request: {
    method: 'PUT',
    path: '/users/{username}/copilot-spaces/{space_number}',
    body: ['name', 'description', 'general_instructions', 'base_role', 'resources_attributes'],
  },
});
