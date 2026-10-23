import { defineTool } from '@usemcpkit/core';

export const copilotCopilotEnterpriseUsageMetrics = defineTool({
  name: 'copilot:copilot_enterprise_usage_metrics',
  description:
    'Get Copilot enterprise usage metrics. Use this endpoint to retrieve download links for the latest 28-day enterprise Copilot usage metrics report. The report provides comprehensive usage data for Copilot features across the enterprise.',
  input: {
    type: 'object',
    properties: {
      enterprise: {
        type: 'string',
        description: 'The slug version of the enterprise name.',
      },
    },
    required: ['enterprise'],
  },
  request: {
    method: 'GET',
    path: '/enterprises/{enterprise}/copilot/metrics/reports/enterprise-28-day/latest',
  },
});
