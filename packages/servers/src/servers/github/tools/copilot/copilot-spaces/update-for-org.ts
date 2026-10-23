import { defineTool } from '@usemcpkit/core';

export const copilotCopilotSpacesUpdateForOrg = defineTool({
  name: 'copilot:copilot_spaces:update_for_org',
  description:
    'Set an organization Copilot Space. Updates a Copilot Space owned by an organization. The authenticated user must have permissions to update spaces in the organization.',
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
          'The base role that determines default permissions for organization members. Changing this field requires admin permissions. - `no_access`: No default access (default) - `reader`: Organization members can read the space - `writer`: Organization members can read and edit the space - `admin`: Organization members have full admin access to the space',
        enum: ['reader', 'writer', 'admin', 'no_access'],
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
    required: ['org', 'space_number'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/copilot-spaces/{space_number}',
    body: ['name', 'description', 'general_instructions', 'base_role', 'resources_attributes'],
  },
});
