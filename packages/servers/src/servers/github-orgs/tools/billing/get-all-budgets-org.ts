import { defineTool } from '@usemcpkit/core';

export const billingGetAllBudgetsOrg = defineTool({
  name: 'billing:get_all_budgets_org',
  description:
    'Get all budgets for an organization. Gets all budgets for an organization. The authenticated user must be an organization admin or billing manager. Each page returns up to 100 budgets.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'The page number of the results to fetch.',
      },
      per_page: {
        type: 'integer',
        default: 10,
        description: 'The number of results per page (max 100).',
      },
      scope: {
        type: 'string',
        enum: ['enterprise', 'organization', 'repository', 'cost_center', 'multi_user_customer', 'user'],
        description: 'Filter budgets by scope type.',
      },
      user: {
        type: 'string',
        description: 'Filter consumed amount details for budgets by the specified user login.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/organizations/{org}/settings/billing/budgets',
    query: ['page', 'per_page', 'scope', 'user'],
  },
});
