import { defineTool } from '@usemcpkit/core';

export const teamsAddOrUpdateRepoPermissionsLegacy = defineTool({
  name: 'teams:add_or_update_repo_permissions_legacy',
  description:
    '[Deprecated] Add or update team repository permissions (Legacy). > [!WARNING] > **Endpoint closing down notice:** This endpoint route is closing down and will be removed from the Teams API. We recommend migrating your existing code to use the new "Add or update team repository permissions" endpoint.',
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
      permission: {
        type: 'string',
        description:
          "The permission to grant the team on this repository. If no permission is specified, the team's `permission` attribute will be used to determine what permission to grant the team on this repository.",
        enum: ['pull', 'push', 'admin'],
      },
    },
    required: ['team_id', 'owner', 'repo'],
  },
  request: {
    method: 'PUT',
    path: '/teams/{team_id}/repos/{owner}/{repo}',
    body: ['permission'],
  },
});
