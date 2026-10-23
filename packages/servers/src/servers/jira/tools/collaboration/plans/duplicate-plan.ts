import { defineTool } from '@usemcpkit/core';

export const collaborationPlansDuplicatePlan = defineTool({
  name: 'collaboration:plans:duplicate_plan',
  description: 'Duplicate plan. Duplicates a plan.',
  input: {
    type: 'object',
    properties: {
      planId: {
        type: 'integer',
        description: 'The ID of the plan.',
      },
      name: {
        type: 'string',
        description: 'The plan name.',
      },
    },
    required: ['planId', 'name'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/plans/plan/{planId}/duplicate',
    body: ['name'],
  },
});
