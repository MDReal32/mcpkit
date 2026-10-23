import { defineTool } from '@usemcpkit/core';

export const orgsBillingGetGithubBillingUsageReportOrg = defineTool({
  name: 'orgs:billing:get_github_billing_usage_report_org',
  description:
    'Get billing usage report for an organization. Gets a report of the total usage for an organization. To use this endpoint, you must be an administrator of an organization within an enterprise or an organization account.',
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
          'If specified, only return results for a single month. The value of `month` is an integer between `1` and `12`. If no year is specified the default `year` is used.',
      },
      day: {
        type: 'integer',
        description:
          'If specified, only return results for a single day. The value of `day` is an integer between `1` and `31`. If no `year` or `month` is specified, the default `year` and `month` are used.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/organizations/{org}/settings/billing/usage',
    query: ['year', 'month', 'day'],
  },
});
