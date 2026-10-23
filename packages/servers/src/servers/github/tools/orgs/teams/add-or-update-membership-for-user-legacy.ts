import { defineTool } from '@usemcpkit/core';

export const orgsTeamsAddOrUpdateMembershipForUserLegacy = defineTool({
  name: 'orgs:teams:add_or_update_membership_for_user_legacy',
  description:
    '[Deprecated] Add or update team membership for a user (Legacy). > [!WARNING] > **Endpoint closing down notice:** This endpoint route is closing down and will be removed from the Teams API. We recommend migrating your existing code to use the new Add or update team membership for a user endpoint.',
  input: {
    type: 'object',
    properties: {
      team_id: {
        type: 'integer',
        description: 'The unique identifier of the team.',
      },
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
      role: {
        type: 'string',
        description: 'The role that this user should have in the team.',
        default: 'member',
        enum: ['member', 'maintainer'],
      },
    },
    required: ['team_id', 'username'],
  },
  request: {
    method: 'PUT',
    path: '/teams/{team_id}/memberships/{username}',
    body: ['role'],
  },
});
