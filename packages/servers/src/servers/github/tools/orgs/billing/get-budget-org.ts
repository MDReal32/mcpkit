import { defineTool } from '@usemcpkit/core';

export const orgsBillingGetBudgetOrg = defineTool({
  name: 'orgs:billing:get_budget_org',
  description:
    'Get a budget by ID for an organization. Gets a budget by ID. The authenticated user must be an organization admin or billing manager.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      budget_id: {
        type: 'string',
        description: 'The ID corresponding to the budget.',
      },
    },
    required: ['org', 'budget_id'],
  },
  request: {
    method: 'GET',
    path: '/organizations/{org}/settings/billing/budgets/{budget_id}',
  },
});
