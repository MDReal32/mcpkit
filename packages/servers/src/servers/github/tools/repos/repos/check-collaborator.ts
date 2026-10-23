import { defineTool } from '@usemcpkit/core';

export const reposReposCheckCollaborator = defineTool({
  name: 'repos:repos:check_collaborator',
  description:
    'Check if a user is a repository collaborator. For organization-owned repositories, the list of collaborators includes outside collaborators, organization members that are direct collaborators, organization members with access through team memberships, organization members with access through default organization permissions, and organization owners.',
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
    path: '/repos/{owner}/{repo}/collaborators/{username}',
  },
});
