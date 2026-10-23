import { defineTool } from '@usemcpkit/core';

export const orgsRemoveMembershipForUser = defineTool({
  name: 'orgs:remove_membership_for_user',
  description:
    "Remove organization membership for a user. In order to remove a user's membership with an organization, the authenticated user must be an organization owner.",
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
    path: '/orgs/{org}/memberships/{username}',
  },
});
