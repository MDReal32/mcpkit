import { defineTool } from '@usemcpkit/core';

export const orgsCheckPublicMembershipForUser = defineTool({
  name: 'orgs:check_public_membership_for_user',
  description:
    'Check public organization membership for a user. Check if the provided user is a public member of the organization.',
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
    path: '/orgs/{org}/public_members/{username}',
  },
});
