import { defineTool } from '@usemcpkit/core';

export const copilotCancelCopilotSeatAssignmentForTeams = defineTool({
  name: 'copilot:cancel_copilot_seat_assignment_for_teams',
  description:
    'Remove teams from the Copilot subscription for an organization. > [!NOTE] > This endpoint is in public preview and is subject to change.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      selected_teams: {
        type: 'array',
        description: 'The names of teams from which to revoke access to GitHub Copilot.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['org', 'selected_teams'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/copilot/billing/selected_teams',
    body: ['selected_teams'],
  },
});
