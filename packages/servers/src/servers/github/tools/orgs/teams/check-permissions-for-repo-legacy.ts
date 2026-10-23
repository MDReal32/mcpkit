import { defineTool } from '@usemcpkit/core';

export const orgsTeamsCheckPermissionsForRepoLegacy = defineTool({
  name: 'orgs:teams:check_permissions_for_repo_legacy',
  description:
    '[Deprecated] Check team permissions for a repository (Legacy). > [!WARNING] > **Endpoint closing down notice:** This endpoint route is closing down and will be removed from the Teams API. We recommend migrating your existing code to use the new Check team permissions for a repository endpoint.',
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
    method: 'GET',
    path: '/teams/{team_id}/repos/{owner}/{repo}',
  },
});
