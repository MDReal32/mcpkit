import { defineTool } from '@usemcpkit/core';

export const copilotSpacesCreateResourceForOrg = defineTool({
  name: 'copilot_spaces:create_resource_for_org',
  description:
    'Create a resource for an organization Copilot Space. Creates a new resource in a specific Copilot Space owned by an organization. The authenticated user must have write permissions on the space.',
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
    required: ['org', 'space_number', 'resource_type', 'metadata'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/copilot-spaces/{space_number}/resources',
    body: ['resource_type', 'metadata'],
  },
});
