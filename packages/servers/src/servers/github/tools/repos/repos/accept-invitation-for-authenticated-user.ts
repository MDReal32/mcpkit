import { defineTool } from '@usemcpkit/core';

export const reposReposAcceptInvitationForAuthenticatedUser = defineTool({
  name: 'repos:repos:accept_invitation_for_authenticated_user',
  description: 'Accept a repository invitation',
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
    method: 'PATCH',
    path: '/user/repository_invitations/{invitation_id}',
  },
});
