import { defineTool } from '@usemcpkit/core';

export const copilotCopilotAddCopilotSeatsForTeams = defineTool({
  name: 'copilot:copilot:add_copilot_seats_for_teams',
  description:
    'Add teams to the Copilot subscription for an organization. > [!NOTE] > This endpoint is in public preview and is subject to change.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      selected_teams: {
        type: 'array',
        description: 'List of team names within the organization to which to grant access to GitHub Copilot.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['org', 'selected_teams'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/copilot/billing/selected_teams',
    body: ['selected_teams'],
  },
});
