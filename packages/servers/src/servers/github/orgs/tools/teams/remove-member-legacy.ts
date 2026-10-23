import { defineTool } from '@usemcpkit/core';

export const teamsRemoveMemberLegacy = defineTool({
  name: 'teams:remove_member_legacy',
  description:
    '[Deprecated] Remove team member (Legacy). The "Remove team member" endpoint (described below) is closing down.',
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
    method: 'DELETE',
    path: '/teams/{team_id}/members/{username}',
  },
});
