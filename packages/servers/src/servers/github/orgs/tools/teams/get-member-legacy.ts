import { defineTool } from '@usemcpkit/core';

export const teamsGetMemberLegacy = defineTool({
  name: 'teams:get_member_legacy',
  description:
    '[Deprecated] Get team member (Legacy). The "Get team member" endpoint (described below) is closing down.',
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
    path: '/teams/{team_id}/members/{username}',
  },
});
