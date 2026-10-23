import { defineTool } from '@usemcpkit/core';

export const copilotCopilotOrganizationUserTeamsOneDayReport = defineTool({
  name: 'copilot:copilot_organization_user_teams_one_day_report',
  description:
    'Get Copilot organization user-teams report for a specific day. Use this endpoint to retrieve download links for the Copilot organization user-teams report for a specific day. The report provides user-team join data for Copilot across the organization, with one entry per user-team pair.',
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
    path: '/orgs/{org}/copilot/metrics/reports/user-teams-1-day',
    query: ['day'],
  },
});
