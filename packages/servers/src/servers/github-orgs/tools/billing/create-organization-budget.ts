import { defineTool } from '@usemcpkit/core';

export const billingCreateOrganizationBudget = defineTool({
  name: 'billing:create_organization_budget',
  description:
    'Create a budget for an organization. Creates a new budget for an organization. The authenticated user must be an organization admin or billing manager.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      budget_amount: {
        type: 'integer',
        description:
          'The budget amount in whole dollars. For license-based products, this represents the number of licenses.',
      },
      prevent_further_usage: {
        type: 'boolean',
        description:
          'Whether to prevent additional spending once the budget is exceeded. For `user` and `multi_user_customer` scopes, this must be `true`.',
      },
      budget_alerting: {
        type: 'object',
        properties: {
          will_alert: {
            type: 'boolean',
            description:
              'Whether alerts are enabled for this budget. Rejected for user-scope as alerting is always disabled for them.',
          },
          alert_recipients: {
            type: 'array',
            description:
              'Array of user login names who will receive alerts. Rejected for user-scope as alerting is always disabled for them.',
            items: {
              type: 'string',
            },
          },
        },
      },
      budget_scope: {
        type: 'string',
        description: 'The scope of the budget for this organization.',
        enum: ['organization', 'repository', 'multi_user_customer', 'user'],
      },
      budget_entity_name: {
        type: 'string',
        description: 'The name of the entity to apply the budget to',
        default: '',
      },
      budget_type: {
        type: 'string',
        description:
          'The type of pricing model used by the budget. Determines how `budget_product_sku` is interpreted.',
      },
      budget_product_sku: {
        type: 'string',
        description: 'A single product or SKU that will be covered in the budget',
      },
      user: {
        type: 'string',
        description:
          'The username of the user for `user` scope budgets. This field is required when `budget_scope` is `user`.',
      },
      expires_at: {
        type: 'string',
        description:
          'The date the budget will expire in `YYYY-MM-DD` format. Only dates in the future are accepted. If not provided, the budget will not expire.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'POST',
    path: '/organizations/{org}/settings/billing/budgets',
    body: [
      'budget_amount',
      'prevent_further_usage',
      'budget_alerting',
      'budget_scope',
      'budget_entity_name',
      'budget_type',
      'budget_product_sku',
      'user',
      'expires_at',
    ],
  },
});
