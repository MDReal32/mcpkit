import { defineTool } from '@usemcpkit/core';

export const orgsGetMembershipForUser = defineTool({
  name: 'orgs:get_membership_for_user',
  description:
    "Get organization membership for a user. In order to get a user's membership with an organization, the authenticated user must be an organization member. The `state` parameter in the response can be used to identify the user's membership status.",
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
    method: 'GET',
    path: '/orgs/{org}/memberships/{username}',
  },
});
