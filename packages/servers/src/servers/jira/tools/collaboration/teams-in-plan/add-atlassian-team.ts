import { defineTool } from '@usemcpkit/core';

export const collaborationTeamsInPlanAddAtlassianTeam = defineTool({
  name: 'collaboration:teams_in_plan:add_atlassian_team',
  description:
    'Add Atlassian team to plan. Adds an existing Atlassian team to a plan and configures their plannning settings.',
  input: {
    type: 'object',
    properties: {
      planId: {
        type: 'integer',
        description: 'The ID of the plan.',
      },
      capacity: {
        type: 'number',
        description: 'The capacity for the Atlassian team.',
      },
      id: {
        type: 'string',
        description: 'The Atlassian team ID.',
      },
      issueSourceId: {
        type: 'integer',
        description: 'The ID of the issue source for the Atlassian team.',
      },
      planningStyle: {
        type: 'string',
        description: 'The planning style for the Atlassian team. This must be "Scrum" or "Kanban".',
        enum: ['Scrum', 'Kanban'],
      },
      sprintLength: {
        type: 'integer',
        description: 'The sprint length for the Atlassian team.',
      },
    },
    required: ['planId', 'id', 'planningStyle'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/plans/plan/{planId}/team/atlassian',
    body: ['capacity', 'id', 'issueSourceId', 'planningStyle', 'sprintLength'],
  },
});
