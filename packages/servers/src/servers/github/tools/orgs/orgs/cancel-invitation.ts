import { defineTool } from '@usemcpkit/core';

export const orgsOrgsCancelInvitation = defineTool({
  name: 'orgs:orgs:cancel_invitation',
  description:
    'Cancel an organization invitation. Cancel an organization invitation. In order to cancel an organization invitation, the authenticated user must be an organization owner.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      invitation_id: {
        type: 'integer',
        description: 'The unique identifier of the invitation.',
      },
    },
    required: ['org', 'invitation_id'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/invitations/{invitation_id}',
  },
});
