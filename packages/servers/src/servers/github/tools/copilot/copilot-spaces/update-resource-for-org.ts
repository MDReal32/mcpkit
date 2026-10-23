import { defineTool } from '@usemcpkit/core';

export const copilotCopilotSpacesUpdateResourceForOrg = defineTool({
  name: 'copilot:copilot_spaces:update_resource_for_org',
  description:
    'Set a resource for an organization Copilot Space. Updates the metadata of a resource in a specific Copilot Space owned by an organization. The authenticated user must have write permissions on the space.',
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
      space_resource_id: {
        type: 'integer',
        description: 'The unique identifier of the resource.',
      },
      metadata: {
        type: 'object',
        description: 'Updated resource-specific metadata.',
      },
    },
    required: ['org', 'space_number', 'space_resource_id'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/copilot-spaces/{space_number}/resources/{space_resource_id}',
    body: ['metadata'],
  },
});
