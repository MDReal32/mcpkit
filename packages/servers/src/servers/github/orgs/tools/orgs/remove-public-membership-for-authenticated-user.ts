import { defineTool } from '@usemcpkit/core';

export const orgsRemovePublicMembershipForAuthenticatedUser = defineTool({
  name: 'orgs:remove_public_membership_for_authenticated_user',
  description:
    'Remove public organization membership for the authenticated user. Removes the public membership for the authenticated user from the specified organization, unless public visibility is enforced by default.',
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
    path: '/orgs/{org}/public_members/{username}',
  },
});
