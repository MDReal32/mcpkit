import { defineTool } from '@usemcpkit/core';

export const appsCodespacesDeleteFromOrganization = defineTool({
  name: 'apps:codespaces:delete_from_organization',
  description: "Delete a codespace from the organization. Deletes a user's codespace.",
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
      codespace_name: {
        type: 'string',
        description: 'The name of the codespace.',
      },
    },
    required: ['org', 'username', 'codespace_name'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/members/{username}/codespaces/{codespace_name}',
  },
});
