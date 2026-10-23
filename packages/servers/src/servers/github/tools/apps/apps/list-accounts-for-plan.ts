import { defineTool } from '@usemcpkit/core';

export const appsAppsListAccountsForPlan = defineTool({
  name: 'apps:apps:list_accounts_for_plan',
  description:
    "List accounts for a plan. Returns user and organization accounts associated with the specified plan, including free plans. For per-seat pricing, you see the list of accounts that have purchased the plan, including the number of seats purchased. When someone submits a plan change that won't be processed until the end of their billing cycle, you will also see the upcoming pending change.",
  input: {
    type: 'object',
    properties: {
      plan_id: {
        type: 'integer',
        description: 'The unique identifier of the plan.',
      },
      sort: {
        type: 'string',
        default: 'created',
        enum: ['created', 'updated'],
        description: 'The property to sort the results by.',
      },
      direction: {
        type: 'string',
        enum: ['asc', 'desc'],
        description: 'To return the oldest accounts first, set to `asc`. Ignored without the `sort` parameter.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['plan_id'],
  },
  request: {
    method: 'GET',
    path: '/marketplace_listing/plans/{plan_id}/accounts',
    query: ['sort', 'direction', 'per_page', 'page'],
  },
});
