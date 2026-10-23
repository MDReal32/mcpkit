import { defineTool } from '@usemcpkit/core';

export const orgsOrgsCheckBlockedUser = defineTool({
  name: 'orgs:orgs:check_blocked_user',
  description:
    'Check if a user is blocked by an organization. Returns a 204 if the given user is blocked by the given organization. Returns a 404 if the organization is not blocking the user, or if the user account has been identified as spam by GitHub.',
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
    path: '/orgs/{org}/blocks/{username}',
  },
});
