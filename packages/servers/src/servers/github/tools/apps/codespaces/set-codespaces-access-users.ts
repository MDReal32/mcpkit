import { defineTool } from '@usemcpkit/core';

export const appsCodespacesSetCodespacesAccessUsers = defineTool({
  name: 'apps:codespaces:set_codespaces_access_users',
  description:
    '[Deprecated] Add users to Codespaces access for an organization. Codespaces for the specified users will be billed to the organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      selected_usernames: {
        type: 'array',
        description:
          'The usernames of the organization members and outside collaborators whose codespaces should be billed to the organization.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['org', 'selected_usernames'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/codespaces/access/selected_users',
    body: ['selected_usernames'],
  },
});
