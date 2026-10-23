import { defineTool } from '@usemcpkit/core';

export const orgsRemoveOutsideCollaborator = defineTool({
  name: 'orgs:remove_outside_collaborator',
  description:
    "Remove outside collaborator from an organization. Removing a user from this list will remove them from all the organization's repositories.",
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
    },
    required: ['org', 'username'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/outside_collaborators/{username}',
  },
});
