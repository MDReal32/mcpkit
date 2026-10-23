import { defineTool } from '@usemcpkit/core';

export const copilotCopilotOrganizationReposOneDayReport = defineTool({
  name: 'copilot:copilot_organization_repos_one_day_report',
  description:
    'Get Copilot organization repository report for a specific day. Use this endpoint to retrieve download links for the Copilot organization repository report for a specific day. The report provides per-repository pull request metrics for Copilot across the organization, with one entry per repository.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      day: {
        type: 'string',
        description: 'The day to request data for, in `YYYY-MM-DD` format.',
      },
    },
    required: ['org', 'day'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/copilot/metrics/reports/repos-1-day',
    query: ['day'],
  },
});
