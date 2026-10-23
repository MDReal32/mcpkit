import { defineTool } from '@usemcpkit/core';

export const collaborationTeamsInPlanGetAtlassianTeam = defineTool({
  name: 'collaboration:teams_in_plan:get_atlassian_team',
  description: 'Get Atlassian team in plan. Returns planning settings for an Atlassian team in a plan.',
  input: {
    type: 'object',
    properties: {
      planId: {
        type: 'integer',
        description: 'The ID of the plan.',
      },
      atlassianTeamId: {
        type: 'string',
        description: 'The ID of the Atlassian team.',
      },
    },
    required: ['planId', 'atlassianTeamId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/plans/plan/{planId}/team/atlassian/{atlassianTeamId}',
  },
});
