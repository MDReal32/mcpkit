import { defineTool } from '@usemcpkit/core';

export const reposReposDeclineInvitationForAuthenticatedUser = defineTool({
  name: 'repos:repos:decline_invitation_for_authenticated_user',
  description: 'Decline a repository invitation',
  input: {
    type: 'object',
    properties: {
      invitation_id: {
        type: 'integer',
        description: 'The unique identifier of the invitation.',
      },
    },
    required: ['invitation_id'],
  },
  request: {
    method: 'DELETE',
    path: '/user/repository_invitations/{invitation_id}',
  },
});
