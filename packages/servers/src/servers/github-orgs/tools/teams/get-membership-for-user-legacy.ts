import { defineTool } from '@usemcpkit/core';

export const teamsGetMembershipForUserLegacy = defineTool({
  name: 'teams:get_membership_for_user_legacy',
  description:
    '[Deprecated] Get team membership for a user (Legacy). > [!WARNING] > **Endpoint closing down notice:** This endpoint route is closing down and will be removed from the Teams API. We recommend migrating your existing code to use the new Get team membership for a user endpoint.',
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
    },
    required: ['team_id', 'username'],
  },
  request: {
    method: 'GET',
    path: '/teams/{team_id}/memberships/{username}',
  },
});
