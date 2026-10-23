import { defineTool } from '@usemcpkit/core';

export const copilotSpacesDeleteForOrg = defineTool({
  name: 'copilot_spaces:delete_for_org',
  description:
    'Delete an organization Copilot Space. Deletes a Copilot Space owned by an organization. The authenticated user must have permissions to delete spaces in the organization.',
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
    },
    required: ['org', 'space_number'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/copilot-spaces/{space_number}',
  },
});
