import { defineTool } from '@usemcpkit/core';

export const reposReposAddCollaborator = defineTool({
  name: 'repos:repos:add_collaborator',
  description:
    'Add a repository collaborator. Add a user to a repository with a specified level of access. If the repository is owned by an organization, this API does not add the user to the organization - a user that has repository access without being an organization member is called an "outside collaborator" (if they are not an Enterprise Managed User) or a "repository collaborator" if they are an Enterprise Managed User. These users are…',
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
      permission: {
        type: 'string',
        description:
          'The permission to grant the collaborator. **Only valid on organization-owned repositories.** We accept the following permissions to be set: `pull`, `triage`, `triage_plus`, `push`, `maintain`, `admin` and you can also specify a custom repository role name, if the owning organization has defined any.',
        default: 'push',
      },
    },
    required: ['owner', 'repo', 'username'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/collaborators/{username}',
    body: ['permission'],
  },
});
