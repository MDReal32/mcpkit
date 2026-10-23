import { defineTool } from '@usemcpkit/core';

export const orgsBillingGetGithubBillingPremiumRequestUsageReportOrg = defineTool({
  name: 'orgs:billing:get_github_billing_premium_request_usage_report_org',
  description:
    'Get billing premium request usage report for an organization. Gets a report of premium request usage for an organization. To use this endpoint, you must be an administrator of an organization within an enterprise or an organization account.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      year: {
        type: 'integer',
        description:
          'If specified, only return results for a single year. The value of `year` is an integer with four digits representing a year. For example, `2025`. Default value is the current year.',
      },
      month: {
        type: 'integer',
        description:
          'If specified, only return results for a single month. The value of `month` is an integer between `1` and `12`. Default value is the current month. If no year is specified the default `year` is used.',
      },
      day: {
        type: 'integer',
        description:
          'If specified, only return results for a single day. The value of `day` is an integer between `1` and `31`. If no `year` or `month` is specified, the default `year` and `month` are used.',
      },
      user: {
        type: 'string',
        description: 'The user name to query usage for. The name is not case sensitive.',
      },
      model: {
        type: 'string',
        description: 'The model name to query usage for. The name is not case sensitive.',
      },
      product: {
        type: 'string',
        description: 'The product name to query usage for. The name is not case sensitive.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/organizations/{org}/settings/billing/premium_request/usage',
    query: ['year', 'month', 'day', 'user', 'model', 'product'],
  },
});
