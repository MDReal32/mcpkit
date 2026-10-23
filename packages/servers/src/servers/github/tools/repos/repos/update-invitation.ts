import { defineTool } from '@usemcpkit/core';

export const reposReposUpdateInvitation = defineTool({
  name: 'repos:repos:update_invitation',
  description: 'Update a repository invitation',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      invitation_id: {
        type: 'integer',
        description: 'The unique identifier of the invitation.',
      },
      permissions: {
        type: 'string',
        description:
          'The permissions that the associated user will have on the repository. Valid values are `read`, `write`, `maintain`, `triage`, and `admin`.',
        enum: ['read', 'write', 'maintain', 'triage', 'admin'],
      },
    },
    required: ['owner', 'repo', 'invitation_id'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/invitations/{invitation_id}',
    body: ['permissions'],
  },
});
