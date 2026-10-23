import { defineTool } from '@usemcpkit/core';

export const reposGetCollaboratorPermissionLevel = defineTool({
  name: 'repos:get_collaborator_permission_level',
  description: 'Get repository permissions for a user. Checks the repository permission and role of a collaborator.',
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
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
    },
    required: ['owner', 'repo', 'username'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/collaborators/{username}/permission',
  },
});
