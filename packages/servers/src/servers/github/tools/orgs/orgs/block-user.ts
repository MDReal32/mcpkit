import { defineTool } from '@usemcpkit/core';

export const orgsOrgsBlockUser = defineTool({
  name: 'orgs:orgs:block_user',
  description:
    'Block a user from an organization. Blocks the given user on behalf of the specified organization and returns a 204. If the organization cannot block the given user a 422 is returned.',
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
    path: '/orgs/{org}/blocks/{username}',
  },
});
