import { defineTool } from '@usemcpkit/core';

export const orgsOrgsUpdateMembershipForAuthenticatedUser = defineTool({
  name: 'orgs:orgs:update_membership_for_authenticated_user',
  description:
    'Update an organization membership for the authenticated user. Converts the authenticated user to an active member of the organization, if that user has a pending invitation from the organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      state: {
        type: 'string',
        description: 'The state that the membership should be in. Only `"active"` will be accepted.',
        enum: ['active'],
      },
    },
    required: ['org', 'state'],
  },
  request: {
    method: 'PATCH',
    path: '/user/memberships/orgs/{org}',
    body: ['state'],
  },
});
