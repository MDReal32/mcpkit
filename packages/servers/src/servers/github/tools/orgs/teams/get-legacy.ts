import { defineTool } from '@usemcpkit/core';

export const orgsTeamsGetLegacy = defineTool({
  name: 'orgs:teams:get_legacy',
  description:
    '[Deprecated] Get a team (Legacy). > [!WARNING] > **Endpoint closing down notice:** This endpoint route is closing down and will be removed from the Teams API. We recommend migrating your existing code to use the Get a team by name endpoint.',
  input: {
    type: 'object',
    properties: {
      team_id: {
        type: 'integer',
        description: 'The unique identifier of the team.',
      },
    },
    required: ['team_id'],
  },
  request: {
    method: 'GET',
    path: '/teams/{team_id}',
  },
});
