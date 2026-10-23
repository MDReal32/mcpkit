import { defineTool } from '@usemcpkit/core';

export const collaborationTeamsInPlanCreatePlanOnlyTeam = defineTool({
  name: 'collaboration:teams_in_plan:create_plan_only_team',
  description: 'Create plan-only team. Creates a plan-only team and configures their planning settings.',
  input: {
    type: 'object',
    properties: {
      planId: {
        type: 'integer',
        description: 'The ID of the plan.',
      },
      capacity: {
        type: 'number',
        description: 'The capacity for the plan-only team.',
      },
      issueSourceId: {
        type: 'integer',
        description: 'The ID of the issue source for the plan-only team.',
      },
      memberAccountIds: {
        type: 'array',
        description: 'The account IDs of the plan-only team members.',
        items: {
          type: 'string',
        },
      },
      name: {
        type: 'string',
        description: 'The plan-only team name.',
      },
      planningStyle: {
        type: 'string',
        description: 'The planning style for the plan-only team. This must be "Scrum" or "Kanban".',
        enum: ['Scrum', 'Kanban'],
      },
      sprintLength: {
        type: 'integer',
        description: 'The sprint length for the plan-only team.',
      },
    },
    required: ['planId', 'name', 'planningStyle'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/plans/plan/{planId}/team/planonly',
    body: ['capacity', 'issueSourceId', 'memberAccountIds', 'name', 'planningStyle', 'sprintLength'],
  },
});
