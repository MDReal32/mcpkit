import { defineTool } from '@usemcpkit/core';

export const copilotCopilotCopilotEnterpriseUserTeamsOneDayReport = defineTool({
  name: 'copilot:copilot:copilot_enterprise_user_teams_one_day_report',
  description:
    'Get Copilot enterprise user-teams report for a specific day. Use this endpoint to retrieve download links for the Copilot enterprise user-teams report for a specific day. The report provides user-team join data for Copilot across the enterprise, with one entry per user-team pair.',
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
    path: '/enterprises/{enterprise}/copilot/metrics/reports/user-teams-1-day',
    query: ['day'],
  },
});
