import { defineTool } from '@usemcpkit/core';

export const orgsOrgsSetPublicMembershipForAuthenticatedUser = defineTool({
  name: 'orgs:orgs:set_public_membership_for_authenticated_user',
  description:
    'Set public organization membership for the authenticated user. The user can publicize their own membership. (A user cannot publicize the membership for another user.)',
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
    method: 'PUT',
    path: '/orgs/{org}/public_members/{username}',
  },
});
