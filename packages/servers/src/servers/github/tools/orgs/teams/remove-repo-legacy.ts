import { defineTool } from '@usemcpkit/core';

export const orgsTeamsRemoveRepoLegacy = defineTool({
  name: 'orgs:teams:remove_repo_legacy',
  description:
    '[Deprecated] Remove a repository from a team (Legacy). > [!WARNING] > **Endpoint closing down notice:** This endpoint route is closing down and will be removed from the Teams API. We recommend migrating your existing code to use the new Remove a repository from a team endpoint.',
  input: {
    type: 'object',
    properties: {
      team_id: {
        type: 'integer',
        description: 'The unique identifier of the team.',
      },
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
    },
    required: ['team_id', 'owner', 'repo'],
  },
  request: {
    method: 'DELETE',
    path: '/teams/{team_id}/repos/{owner}/{repo}',
  },
});
