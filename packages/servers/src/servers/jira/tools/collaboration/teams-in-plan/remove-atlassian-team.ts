import { defineTool } from '@usemcpkit/core';

export const collaborationTeamsInPlanRemoveAtlassianTeam = defineTool({
  name: 'collaboration:teams_in_plan:remove_atlassian_team',
  description:
    'Remove Atlassian team from plan. Removes an Atlassian team from a plan and deletes their planning settings.',
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
    method: 'DELETE',
    path: '/rest/api/2/plans/plan/{planId}/team/atlassian/{atlassianTeamId}',
  },
});
