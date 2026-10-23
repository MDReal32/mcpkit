import { defineTool } from '@usemcpkit/core';

export const copilotCopilotOrganizationUsageMetrics = defineTool({
  name: 'copilot:copilot_organization_usage_metrics',
  description:
    'Get Copilot organization usage metrics. Use this endpoint to retrieve download links for the latest 28-day organization Copilot usage metrics report. The report provides comprehensive usage data for Copilot features across the organization.',
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
    path: '/orgs/{org}/copilot/metrics/reports/organization-28-day/latest',
  },
});
