import { defineTool } from '@usemcpkit/core';

export const copilotCopilotCopilotOrganizationUsersUsageMetrics = defineTool({
  name: 'copilot:copilot:copilot_organization_users_usage_metrics',
  description:
    'Get Copilot organization users usage metrics. Use this endpoint to retrieve download links for the latest 28-day organization users Copilot usage metrics report. The report provides detailed user-level usage data and engagement metrics for Copilot features across the organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/copilot/metrics/reports/users-28-day/latest',
  },
});
