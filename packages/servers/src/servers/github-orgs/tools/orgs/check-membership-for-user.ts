import { defineTool } from '@usemcpkit/core';

export const orgsCheckMembershipForUser = defineTool({
  name: 'orgs:check_membership_for_user',
  description:
    'Check organization membership for a user. Check if a user is, publicly or privately, a member of the organization.',
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
    path: '/orgs/{org}/members/{username}',
  },
});
