import { defineTool } from '@usemcpkit/core';

export const copilotSpacesDeleteResourceForOrg = defineTool({
  name: 'copilot_spaces:delete_resource_for_org',
  description:
    'Delete a resource from an organization Copilot Space. Deletes a resource from a specific Copilot Space owned by an organization. The authenticated user must have write permissions on the space.',
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
    },
    required: ['org', 'space_number', 'space_resource_id'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/copilot-spaces/{space_number}/resources/{space_resource_id}',
  },
});
