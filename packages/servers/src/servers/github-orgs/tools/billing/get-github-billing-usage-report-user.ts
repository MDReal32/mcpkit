import { defineTool } from '@usemcpkit/core';

export const billingGetGithubBillingUsageReportUser = defineTool({
  name: 'billing:get_github_billing_usage_report_user',
  description: 'Get billing usage report for a user. Gets a report of the total usage for a user.',
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
      year: {
        type: 'integer',
        description:
          'If specified, only return results for a single year. The value of `year` is an integer with four digits representing a year. For example, `2025`. Default value is the current year.',
      },
      month: {
        type: 'integer',
        description:
          'If specified, only return results for a single month. The value of `month` is an integer between `1` and `12`. If no year is specified the default `year` is used.',
      },
      day: {
        type: 'integer',
        description:
          'If specified, only return results for a single day. The value of `day` is an integer between `1` and `31`. If no `year` or `month` is specified, the default `year` and `month` are used.',
      },
    },
    required: ['username'],
  },
  request: {
    method: 'GET',
    path: '/users/{username}/settings/billing/usage',
    query: ['year', 'month', 'day'],
  },
});
