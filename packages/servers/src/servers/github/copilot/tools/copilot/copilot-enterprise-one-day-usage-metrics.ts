import { defineTool } from '@usemcpkit/core';

export const copilotCopilotEnterpriseOneDayUsageMetrics = defineTool({
  name: 'copilot:copilot_enterprise_one_day_usage_metrics',
  description:
    'Get Copilot enterprise usage metrics for a specific day. Use this endpoint to retrieve download links for the Copilot enterprise usage metrics report for a specific day. The report provides comprehensive usage data for Copilot features across the enterprise.',
  input: {
    type: 'object',
    properties: {
      enterprise: {
        type: 'string',
        description: 'The slug version of the enterprise name.',
      },
      day: {
        type: 'string',
        description: 'The day to request data for, in `YYYY-MM-DD` format.',
      },
    },
    required: ['enterprise', 'day'],
  },
  request: {
    method: 'GET',
    path: '/enterprises/{enterprise}/copilot/metrics/reports/enterprise-1-day',
    query: ['day'],
  },
});
